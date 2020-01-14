import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stubs-router',
  templateUrl: './stubs-router.component.html',
  styleUrls: ['./stubs-router.component.scss']
})
export class StubsRouterComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) { }

  save() {
      this.router.navigate(['donuts']);
  }

  ngOnInit() {
      this.route.params.subscribe(p => {
          if (p['id'] === 0)
              this.router.navigate(['not-found']);
      });
  }

}
