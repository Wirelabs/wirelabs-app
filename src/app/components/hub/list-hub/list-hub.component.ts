import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-hub',
  templateUrl: './list-hub.component.html',
  styleUrls: ['./list-hub.component.scss'],
})
export class ListHubComponent implements OnInit {
  @Input() id: string | null = null;
  @Input() name: string | null = null;
  @Input() status: string | null = null;
  @Input() letter: boolean | null = null;
  @Input() searchQuery: string | null = null;

  constructor(private router: Router) { }

  ngOnInit() {}

  public goToDevices(): void {
    if(this.status === 'active') {
      this.router.navigate(['/device-overview/' + this.id]);
    }
  }
}
