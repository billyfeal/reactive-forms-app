import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface menuItem {
  title: string;
  route: string;
};

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  reactiveMenuItem: menuItem[] = reactiveItems
  .filter(item => item.path !== '**')
  .map(
    item => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`
    })
  );

  authMenu: menuItem[] = [
    {
      title: 'sing-up',
      route: './auth'
    },

  ];

  countryMenu: menuItem[] = [
    {
      title: 'Countries',
      route: './country'
    },
    
  ];
 }
