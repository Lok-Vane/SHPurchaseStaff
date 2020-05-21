import { Directive, HostListener, ElementRef, Renderer, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Directive({
  selector: 'input[appSpaceDel]'
})
export class RemoveSpaceDirective implements OnInit {

  constructor(
    private message: NzMessageService,
    public elementref: ElementRef,
    public renderer: Renderer,
  ) { }

  ngOnInit() {

  }

  /**
   * HostListener 是属性装饰器，用来为宿主元素添加事件监听。
   */
  @HostListener('keyup', ['$event.target']) keyupFunction(e) {
    if (e.value) {
      this.elementref.nativeElement.value = e.value.replace(/\s+/g, '');
    }
  }
  @HostListener('keydown', ['$event.target']) keydownFunction(e) {
    if (e.value) {
      this.elementref.nativeElement.value = e.value.replace(/\s+/g, '');
    }
  }
  @HostListener('keypress', ['$event.target']) keypressFunction(e) {
    if (e.value) {
      this.elementref.nativeElement.value = e.value.replace(/\s+/g, '');
    }
  }

}
