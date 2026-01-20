import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeatureFlag, FeatureFlagService } from '../../services/feature-flag';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  allFlags: FeatureFlag[] = [];
  flags: FeatureFlag[] = [];
  environment: string = 'all';

  constructor(private flagService: FeatureFlagService) {

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
    this.flagService.toggleFlag(flag.id).subscribe(() => {
      flag.enabled = !flag.enabled;
    });
  }

  onEnvChange(): void {
    this.filterFlags();
  }
}
