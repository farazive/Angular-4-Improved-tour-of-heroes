import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from "../service/hero.service";
import {Router} from "@angular/router";

@Component({
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css'],
    providers: [HeroService]
})


export class HeroesComponent implements OnInit {

    ngOnInit(): void {
        this.getHeroes();
    }

    constructor(
        private heroService: HeroService,
        private router: Router
    ) {
    }

    title = 'Tour of Heroes';

    heroes: Hero[];

    selectedHero: Hero;

    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => {
                this.heroes = heroes;
            }
        );
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
                this.heroes.push(hero);
                this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }
}