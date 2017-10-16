import * as React from 'react';
import { NgModule, Component, AfterViewInit, InjectionToken, Inject, ReflectiveInjector }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Bar }  from './Bar';
import { Yarn }  from './Yarn';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Directive, ViewContainerRef, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import * as ReactDOM from 'react-dom/server.browser';


@Directive({
  selector: '[adost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
interface COMPONENT {}
const COMPONENT = new InjectionToken<string>('Component');

@Component({
  selector: 'app',
  template: `<ng-template adost></ng-template>`
})
class App implements AfterViewInit {
  @ViewChild(AdDirective) adost: AdDirective;
  constructor (private componentFactoryResolver: ComponentFactoryResolver,  @Inject(COMPONENT) private component) {}

  ngAfterViewInit() {
    this.loadComponent();
  }

  loadComponent() {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    let viewContainerRef = this.adost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory); 
  }
}



function AppModuleFactory(ID, components, template) {
  console.log(components);
  @Component({
    selector: `app-${ID}`,
    template
  })
  class App {}

  @NgModule({
    imports: [ BrowserModule ],
    declarations: [ ...components, App],
    bootstrap: [ App ]
  })
  class AppModule {}
  
  return AppModule;
}

interface IAngularProps {
  components: Array<Component>
}

export class Angular extends React.Component<IAngularProps, any> {
  public static defaultProps: Partial<IAngularProps> = {
    components: []
  };
  public render () {
    const ID = (new Date()).getTime();
    
    const AppModule = AppModuleFactory(ID, this.props.components, ReactDOM.renderToStaticMarkup(this.props.children));
    
    const element = React.createElement(`app-${ID}`);
    platformBrowserDynamic().bootstrapModule(AppModule);
    return element;
  }
}
