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
  flags: FeatureFlag[] = [];
  environment: string = 'all';

  constructor(private flagService: FeatureFlagService) {

  }

  ngOnInit(): void {
    this.loadFlags();
  }

  loadFlags(): void {
    this.flagService.getFlags(this.environment).subscribe(data => {
      this.flags = data;
    });
  }

  toggle(flag: FeatureFlag): void {
    this.flagService.toggleFlag(flag.id).subscribe(() => {
      flag.enabled = !flag.enabled; // update locally
    });
  }

  onEnvChange(): void {
    this.loadFlags();
  }
}
