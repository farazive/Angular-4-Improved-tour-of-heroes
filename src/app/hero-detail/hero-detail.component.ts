import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Location} from "@angular/common";
import {Hero} from '../hero';
import {HeroService} from "../service/hero.service";
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

    @Input() hero: Hero;

    constructor(
        private heroService :HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
        /**
         * The switchMap operator will create a derived observable (called inner observable) from a source observable and emit those values.
         * When the source emits a new value, it will create a new inner observable and switch to those values instead.
         * What gets unsubscribed from are the inner observables that get created on the fly, and not the source observable.
         * From : http://blog.angular-university.io/rxjs-switchmap-operator/
         */
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(() => this.goBack());
    }
}
