import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Widget, WidgetsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetsComponent implements OnInit {
  widgets$: Observable<Widget[]>;
  currentWidget$: Observable<Widget>;

  constructor(private facade: WidgetsFacade) {
    this.widgets$ = facade.widgets$;
    this.currentWidget$ = facade.currentWidget$;
    facade.mutations$.subscribe(_ => this.resetCurrentWidget());
  }

  ngOnInit() {
    this.getWidgets();
  }

  resetCurrentWidget() {
    this.selectWidget({ id: null });
  }

  selectWidget(widget) {
    this.facade.selectWidget(widget.id);
  }

  reset(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.facade.loadAll();
  }

  saveWidget(widget: Widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget: Widget): void {
    this.facade.addWidget(widget);
  }

  updateWidget(widget: Widget): void {
    this.facade.updateWidget(widget);
  }

  deleteWidget(widget: Widget): void {
    this.facade.deleteWidget(widget.id);
  }
}
