import { Directive, HostListener, ElementRef, Renderer, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Directive({
  selector: 'input[appCopyCut]'
})
export class CopyCutDirective implements OnInit {

  constructor(
    private message: NzMessageService,
    public elementref: ElementRef,
    public renderer: Renderer,
  ) { }

  ngOnInit() {

  }

  @HostListener('copy', ['$event.target']) copyFunction(e) {
    this.message.create('success', '复制成功');
  }
  @HostListener('cut', ['$event.target']) cutFunction(e) {
    this.message.create('success', '剪切成功');
  }

}
