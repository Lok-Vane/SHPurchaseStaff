import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalSettingService {

  constructor() { }

  // =>消息框停留时长
  messageTime = 3500;

  // =>删除提示
  delConfirmText = '您确认要删除吗?';

  // =>恢复提示
  recConfirmText = '您确认要恢复吗?';

  // =>数据加载提示
  loadingText = '数据疯狂加载中，请您耐心等待...';

  // =>文件导出提示
  exportingText = '导出文件生成中，请您耐心等待...';

  // =>控件尺寸
  controlSize = 'small';

  // =>防抖动延迟毫秒时间
  delayMillisecond = 500;

  // =>条件运算符
  equal = 'equal'; // 等于
  noEqu = 'ne'; // 不等于
  greaterThan = 'gt'; // 大于
  lessThan = 'lt'; // 小于
  greaterThanEqual = 'gte'; // 大于等于
  lessThanEqual = 'lte';  // 小于等于
  in = 'in'; // 在...之中
  notIn = 'nin'; // 不在...之中
  isNull = 'isnull'; // 为空
  notNull = 'notnull'; // 非空
  between = 'between'; // 两者之间
  like = 'like'; // 模糊匹配
  leftLike = 'llike'; // 左匹配
  rightLike = 'rlike'; // 右匹配

  // 设置每页显示条数集合
  getPageSizeOptions() {
    return [
      2,
      20,
      50,
      100,
      200,
      500
    ];
  }

  // =>设置AGGrid本地化
  getAGGridLocaleText(languageStr?: string) {
    if (languageStr && languageStr.toLowerCase() === 'en') {
      return this.getEnText();
    } else {
      return this.getzhCNText();
    }
  }

  // =>AGGrid英文
  private getEnText() {
    return {
      // for filter panel
      page: 'daPage',
      more: 'daMore',
      to: 'daTo',
      of: 'daOf',
      next: 'daNexten',
      last: 'daLasten',
      first: 'daFirsten',
      previous: 'daPreviousen',
      loadingOoo: 'daLoading...',

      // for set filter
      selectAll: 'daSelect Allen',
      searchOoo: 'daSearch...',
      blanks: 'daBlanc',

      // for number filter and text filter
      filterOoo: 'daFilter...',
      applyFilter: 'daApplyFilter...',
      equals: 'daEquals',
      notEquals: 'daNotEqual',

      // for number filter
      lessThan: 'daLessThan',
      greaterThan: 'daGreaterThan',
      lessThanOrEqual: 'daLessThanOrEqual',
      greaterThanOrEqual: 'daGreaterThanOrEqual',
      inRange: 'daInRange',

      // for text filter
      contains: 'daContains',
      notContains: 'daNotContains',
      startsWith: 'daStarts dawith',
      endsWith: 'daEnds dawith',

      // filter conditions
      andCondition: 'daAND',
      orCondition: 'daOR',

      // the header of the default group column
      group: 'laGroup',

      // tool panel
      columns: 'laColumns',
      filters: 'laFilters',
      rowGroupColumns: 'laPivot Cols',
      rowGroupColumnsEmptyMessage: 'la drag cols to group',
      valueColumns: 'laValue Cols',
      pivotMode: 'laPivot-Mode',
      groups: 'laGroups',
      values: 'laValues',
      pivots: 'laPivots',
      valueColumnsEmptyMessage: 'la drag cols to aggregate',
      pivotColumnsEmptyMessage: 'la drag here to pivot',
      toolPanelButton: 'la tool panel',

      // other
      noRowsToShow: 'la no rows',

      // enterprise menu
      pinColumn: 'laPin Column',
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: 'laAutosize Diz',
      autosizeAllColumns: 'laAutsoie em All',
      groupBy: 'laGroup by',
      ungroupBy: 'laUnGroup by',
      resetColumns: 'laReset Those Cols',
      expandAll: 'laOpen-em-up',
      collapseAll: 'laClose-em-up',
      toolPanel: 'laTool Panelo',
      export: 'laExporto',
      csvExport: 'laCSV Exportp',
      excelExport: 'laExcel Exporto (.xlsx)',
      excelXmlExport: 'laExcel Exporto (.xml)',

      // enterprise menu (charts)
      pivotChartAndPivotMode: 'laPivot Chart & Pivot Mode',
      pivotChart: 'laPivot Chart',
      chartRange: 'laChart Range',

      columnChart: 'laColumn',
      groupedColumn: 'laGrouped',
      stackedColumn: 'laStacked',
      normalizedColumn: 'la100% Stacked',

      barChart: 'laBar',
      groupedBar: 'laGrouped',
      stackedBar: 'laStacked',
      normalizedBar: 'la100% Stacked',

      pieChart: 'laPie',
      pie: 'laPie',
      doughnut: 'laDoughnut',

      line: 'laLine',

      xyChart: 'laX Y (Scatter)',
      scatter: 'laScatter',
      bubble: 'laBubble',

      areaChart: 'laArea',
      area: 'laArea',
      stackedArea: 'laStacked',
      normalizedArea: 'la100% Stacked',

      // enterprise menu pinning
      pinLeft: 'laPin <<',
      pinRight: 'laPin >>',
      noPin: 'laDontPin <>',

      // enterprise menu aggregation and status bar
      sum: 'laSum',
      min: 'laMin',
      max: 'laMax',
      none: 'laNone',
      count: 'laCount',
      average: 'laAverage',
      filteredRows: 'laFiltered',
      selectedRows: 'laSelected',
      totalRows: 'laTotal Rows',
      totalAndFilteredRows: 'laRows',

      // standard menu
      copy: 'laCopy',
      copyWithHeaders: 'laCopy Wit hHeaders',
      ctrlC: 'ctrl n C',
      paste: 'laPaste',
      ctrlV: 'ctrl n V',

      // charts
      pivotChartTitle: 'laPivot Chart',
      rangeChartTitle: 'laRange Chart',
      settings: 'laSettings',
      data: 'laData',
      format: 'laFormat',
      categories: 'laCategories',
      series: 'laSeries',
      axis: 'laAxis',
      color: 'laColor',
      thickness: 'laThickness',
      xRotation: 'laX Rotation',
      yRotation: 'laY Rotation',
      ticks: 'laTicks',
      width: 'laWidth',
      length: 'laLength',
      padding: 'laPadding',
      chart: 'laChart',
      title: 'laTitle',
      font: 'laFont',
      top: 'laTop',
      right: 'laRight',
      bottom: 'laBottom',
      left: 'laLeft',
      labels: 'laLabels',
      size: 'laSize',
      legend: 'laLegend',
      position: 'laPosition',
      markerSize: 'laMarker Size',
      markerStroke: 'laMarker Stroke',
      markerPadding: 'laMarker Padding',
      itemPaddingX: 'laItem Padding X',
      itemPaddingY: 'laItem Padding Y',
      strokeWidth: 'laStroke Width',
      offset: 'laOffset',
      tooltips: 'laTooltips',
      offsets: 'laOffsets',
      callout: 'laCallout',
      markers: 'laMarkers',
      shadow: 'laShadow',
      blur: 'laBlur',
      xOffset: 'laX Offset',
      yOffset: 'laY Offset',
      lineWidth: 'laLine Width',
      normal: 'laNormal',
      bold: 'laBold',
      italic: 'laItalic',
      boldItalic: 'laBold Italic',
      fillOpacity: 'laFill Opacity',
      strokeOpacity: 'laLine Opacity',
      columnGroup: 'Column',
      barGroup: 'Bar',
      pieGroup: 'Pie',
      lineGroup: 'Line',
      scatterGroup: 'Scatter',
      areaGroup: 'Area',
      groupedColumnTooltip: 'laGrouped',
      stackedColumnTooltip: 'laStacked',
      normalizedColumnTooltip: 'la100% Stacked',
      groupedBarTooltip: 'laGrouped',
      stackedBarTooltip: 'laStacked',
      normalizedBarTooltip: 'la100% Stacked',
      pieTooltip: 'laPie',
      doughnutTooltip: 'laDoughnut',
      lineTooltip: 'laLine',
      groupedAreaTooltip: 'laGrouped',
      stackedAreaTooltip: 'laStacked',
      normalizedAreaTooltip: 'la100% Stacked',
      scatterTooltip: 'laScatter',
      bubbleTooltip: 'laBubble',
      noDataToChart: 'laNo data available to be charted.',
      pivotChartRequiresPivotMode: 'laPivot Chart requires Pivot Mode enabled.'
    };
  }

  // =>AGGrid汉化
  private getzhCNText() {
    return {
      // for filter panel
      page: '页',
      more: '更多',
      to: '到',
      of: 'of',
      next: '下一页',
      last: '末页',
      first: '首页',
      previous: '上一页',
      loadingOoo: '加载中...',

      // for set filter
      selectAll: '全选',
      searchOoo: '查询中...',
      blanks: '空白',

      // for number filter and text filter
      filterOoo: '过滤中...',
      applyFilter: '应用过滤...',
      equals: '等于',
      notEqual: '不等于',

      // for number filter
      lessThan: '小于',
      greaterThan: '大于',
      lessThanOrEqual: '小于等于',
      greaterThanOrEqual: '大于等于',
      inRange: '在...之中',

      // for text filter
      contains: '包含',
      notContains: '不包含',
      startsWith: '开头是',
      endsWith: '结尾是',

      // filter conditions
      andCondition: '并且',
      orCondition: '或者',

      // the header of the default group column
      group: '分组',

      // tool panel
      columns: '列',
      filters: '筛选',
      rowGroupColumns: '行分组',
      rowGroupColumnsEmptyMessage: '拖拽列到行分组',
      valueColumns: '值聚合',
      pivotMode: 'laPivot-Mode',
      groups: 'laGroups',
      values: 'laValues',
      pivots: 'laPivots',
      valueColumnsEmptyMessage: 'la drag cols to aggregate',
      pivotColumnsEmptyMessage: 'la drag here to pivot',
      toolPanelButton: '工具面板',

      // other
      noRowsToShow: '没有数据可以展示',

      // enterprise menu
      pinColumn: 'laPin Column',
      valueAggregation: 'laValue Agg',
      autosizeThiscolumn: 'laAutosize Diz',
      autosizeAllColumns: 'laAutsoie em All',
      groupBy: '排序',
      ungroupBy: '不排序',
      resetColumns: '重置列',
      expandAll: '展开全部',
      collapseAll: '收缩全部',
      toolPanel: '工具面板',
      export: '导出',
      csvExport: '导出为CSV (.csv)laCSV Exportp',
      excelExport: '导出为Excel (.xlsx)',
      excelXmlExport: '导出为XML (.xml)',

      // enterprise menu (charts)
      pivotChartAndPivotMode: 'laPivot Chart & Pivot Mode',
      pivotChart: 'laPivot Chart',
      chartRange: 'laChart Range',

      columnChart: 'laColumn',
      groupedColumn: 'laGrouped',
      stackedColumn: 'laStacked',
      normalizedColumn: 'la100% Stacked',

      barChart: 'laBar',
      groupedBar: 'laGrouped',
      stackedBar: 'laStacked',
      normalizedBar: 'la100% Stacked',

      pieChart: 'laPie',
      pie: 'laPie',
      doughnut: 'laDoughnut',

      line: 'laLine',

      xyChart: 'laX Y (Scatter)',
      scatter: 'laScatter',
      bubble: 'laBubble',

      areaChart: 'laArea',
      area: 'laArea',
      stackedArea: 'laStacked',
      normalizedArea: 'la100% Stacked',

      // enterprise menu pinning
      pinLeft: 'laPin <<',
      pinRight: 'laPin >>',
      noPin: 'laDontPin <>',

      // enterprise menu aggregation and status bar
      sum: '求和',
      min: '最小',
      max: '最大',
      none: '无',
      count: '计数',
      average: '平均值',
      filteredRows: '过滤行',
      selectedRows: '选择行',
      totalRows: '总行数',
      totalAndFilteredRows: '符合条件总行数',

      // standard menu
      copy: '复制',
      copyWithHeaders: '连同标题一起复制',
      ctrlC: 'ctrl + C',
      paste: '粘贴',
      ctrlV: 'ctrl + V',

      // charts
      pivotChartTitle: 'laPivot Chart',
      rangeChartTitle: 'laRange Chart',
      settings: 'laSettings',
      data: 'laData',
      format: 'laFormat',
      categories: 'laCategories',
      series: 'laSeries',
      axis: 'laAxis',
      color: 'laColor',
      thickness: 'laThickness',
      xRotation: 'laX Rotation',
      yRotation: 'laY Rotation',
      ticks: 'laTicks',
      width: '宽度',
      length: '长度',
      padding: '内边距',
      chart: 'laChart',
      title: 'laTitle',
      font: 'laFont',
      top: '顶部',
      right: '右边',
      bottom: '底部',
      left: '左边',
      labels: 'laLabels',
      size: 'laSize',
      legend: 'laLegend',
      position: 'laPosition',
      markerSize: 'laMarker Size',
      markerStroke: 'laMarker Stroke',
      markerPadding: 'laMarker Padding',
      itemPaddingX: 'laItem Padding X',
      itemPaddingY: 'laItem Padding Y',
      strokeWidth: 'laStroke Width',
      offset: 'laOffset',
      tooltips: 'laTooltips',
      offsets: 'laOffsets',
      callout: 'laCallout',
      markers: 'laMarkers',
      shadow: 'laShadow',
      blur: 'laBlur',
      xOffset: 'laX Offset',
      yOffset: 'laY Offset',
      lineWidth: 'laLine Width',
      normal: 'laNormal',
      bold: 'laBold',
      italic: 'laItalic',
      boldItalic: 'laBold Italic',
      fillOpacity: 'laFill Opacity',
      strokeOpacity: 'laLine Opacity',
      columnGroup: 'Column',
      barGroup: 'Bar',
      pieGroup: 'Pie',
      lineGroup: 'Line',
      scatterGroup: 'Scatter',
      areaGroup: 'Area',
      groupedColumnTooltip: 'laGrouped',
      stackedColumnTooltip: 'laStacked',
      normalizedColumnTooltip: 'la100% Stacked',
      groupedBarTooltip: 'laGrouped',
      stackedBarTooltip: 'laStacked',
      normalizedBarTooltip: 'la100% Stacked',
      pieTooltip: 'laPie',
      doughnutTooltip: 'laDoughnut',
      lineTooltip: 'laLine',
      groupedAreaTooltip: 'laGrouped',
      stackedAreaTooltip: 'laStacked',
      normalizedAreaTooltip: 'la100% Stacked',
      scatterTooltip: 'laScatter',
      bubbleTooltip: 'laBubble',
      noDataToChart: 'laNo data available to be charted.',
      pivotChartRequiresPivotMode: 'laPivot Chart requires Pivot Mode enabled.'
    };
  }
}
