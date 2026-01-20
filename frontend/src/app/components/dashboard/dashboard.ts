import { Component, ChangeDetectorRef, ChangeDetectionStrategy, NgZone, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureFlag, FeatureFlagService } from '../../services/feature-flag';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class Dashboard {
  allFlags: FeatureFlag[] = [];
  flags: FeatureFlag[] = [];
  environment: string = 'all';
  showAddForm: boolean = false;
  newFlag: Partial<FeatureFlag> = { name: '', environment: 'dev', enabled: false };

  constructor(private flagService: FeatureFlagService, private cdr: ChangeDetectorRef, private ngZone: NgZone, private appRef: ApplicationRef) {

  }

  ngOnInit(): void {
    this.loadAllFlags();
  }

  loadAllFlags(): void {
    this.flagService.getFlags('all').subscribe(data => {
      this.allFlags = data;
      this.filterFlags();
    });
  }

  filterFlags(): void {
    if (this.environment === 'all') {
      this.flags = this.allFlags;
    } else {
      this.flags = this.allFlags.filter(flag => flag.environment === this.environment);
    }
  }

  toggle(flag: FeatureFlag): void {
    this.flagService.toggleFlag(flag.id).subscribe({
      next: (updatedFlag) => {
        setTimeout(() => {
          flag.enabled = updatedFlag.enabled;
        }, 0);
      },
      error: (error) => {
        console.error('Error toggling flag:', error);
      }
    });
  }

  deleteFlag(flag: FeatureFlag): void {
    if (confirm(`Delete flag "${flag.name}"?`)) {
      this.flagService.deleteFlag(flag.id).subscribe({
        next: () => {
          this.allFlags = this.allFlags.filter(f => f.id !== flag.id);
          this.filterFlags();
        },
        error: (error) => {
          console.error('Error deleting flag:', error);
        }
      });
    }
  }

  addFlag(): void {
    if (!this.newFlag.name) return;
    this.flagService.createFlag(this.newFlag as FeatureFlag).subscribe({
      next: (createdFlag) => {
        this.allFlags.push(createdFlag);
        this.filterFlags();
        this.showAddForm = false;
        this.newFlag = { name: '', environment: 'dev', enabled: false };
      },
      error: (error) => {
        console.error('Error creating flag:', error);
      }
    });
  }

  trackByFlagId(index: number, flag: FeatureFlag): number {
    return flag.id;
  }

  onEnvChange(): void {
    this.filterFlags();
  }
}
