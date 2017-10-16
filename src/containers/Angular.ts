import * as React from 'react';
import { NgModule, Component, AfterViewInit, InjectionToken, Inject, ReflectiveInjector }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Directive, ViewContainerRef, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import * as ReactDOM from 'react-dom/server.browser';

function AppModuleFactory(ID, components, template) {
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
