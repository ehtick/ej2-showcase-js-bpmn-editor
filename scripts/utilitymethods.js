const {
    NodeProperties,
    ConnectorProperties,
    TextProperties,
  } = require('./common.js');
  var textProperties = new TextProperties();
class UtilityMethods {
    constructor() { }

    toolbarClick(args) {
        let item = args.item.tooltipText;
        var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        switch (item) {
            case 'Undo':
                diagram.ej2_instances[0].undo();
                break;
            case 'Redo':
                diagram.ej2_instances[0].redo();
                break;
            case 'Zoom In(Ctrl + +)':
                diagram.ej2_instances[0].zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out(Ctrl + -)':
                diagram.ej2_instances[0].zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Lock':
                this.lockObject();
                break;
            case 'Cut':
                diagram.ej2_instances[0].cut();
                break;
            case 'Copy':
                diagram.ej2_instances[0].copy();
                break;
            case 'Paste':
                diagram.ej2_instances[0].paste();
                break;
            case 'Delete':
                diagram.ej2_instances[0].remove();
                break;
            case 'Select Tool':
                diagram.ej2_instances[0].clearSelection();
                // diagram.drawingObject = {};
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.Default;
                break;
            case 'Text Tool':
                // diagram.clearSelection();
                diagram.ej2_instances[0].selectedItems.userHandles = [];
                diagram.ej2_instances[0].drawingObject = { shape: { type: 'Text' }, };
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ContinuousDraw;
                break;
            case 'Pan Tool':
                diagram.ej2_instances[0].clearSelection()
                // diagram.drawingObject = {};
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ZoomPan;
                break;
            case 'Rotate Clockwise':
                diagram.ej2_instances[0].rotate(diagram.ej2_instances[0].selectedItems, 90);
                break;
            case 'Rotate Counter-clockwise':
                diagram.ej2_instances[0].rotate(diagram.ej2_instances[0].selectedItems, -90);
                break;
            case 'Bring To Front':
                diagram.ej2_instances[0].bringToFront();
                break;
            case 'Send To Back':
                diagram.ej2_instances[0].sendToBack();
                break;
            case 'Bring Forward':
                diagram.ej2_instances[0].moveForward();
                break;
            case 'Send Backward':
                diagram.ej2_instances[0].sendBackward();
                break;
            case 'Align Left':
            case 'Align Right':
            case 'Align Top':
            case 'Align Bottom':
            case 'Align Middle':
            case 'Align Center':
                // selectedItem.isModified = true;
                var alignType = item.replace('Align', '');
                var alignType1 = alignType.charAt(0).toUpperCase() + alignType.slice(1);
                diagram.ej2_instances[0].align(alignType1.trim());
                break;
            case 'Distribute Objects Horizontally':
                diagram.ej2_instances[0].distribute('RightToLeft');
                break;
            case 'Distribute Objects Vertically':
                diagram.ej2_instances[0].distribute('BottomToTop');
                break;
            case 'Group':
                diagram.ej2_instances[0].group();
                args.item.prefixIcon = 'sf-icon-ungroup';
                args.item.tooltipText = 'UnGroup';
                break;
            case 'UnGroup':
                diagram.ej2_instances[0].unGroup();
                args.item.prefixIcon = 'sf-icon-group';
                args.item.tooltipText = 'Group';
                break;
            case 'New Diagram':
                diagram.ej2_instances[0].clear();
                break;
            case 'Print Diagram':
                this.btnPrintClick();
                break;
            case 'Export Diagram':
                exportDialog.show();
                break;
            case 'Save Diagram':
                this.download(diagram.saveDiagram());
                break;
            case 'Open Diagram':
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                break;
            case 'Flip Vertical':
                this.flipObjects(item);
                break;
            case 'Flip Horizontal':
                this.flipObjects(item);
                break;
        }
        if (item === 'Select Tool' || item === 'Pan Tool' || item === 'Text Tool') {
            if (args.item.cssClass.indexOf('tb-item-selected') === -1) {
                this.removeSelectedToolbarItem();
                args.item.cssClass += ' tb-item-selected';
            }
        }
        diagram.ej2_instances[0].dataBind();
    }
    // To lock diagram object
    lockObject(args) {
        for (var i = 0; i < diagram.ej2_instances[0].selectedItems.nodes.length; i++) {
            var node = diagram.ej2_instances[0].selectedItems.nodes[i];
            if (node.constraints & ej.diagrams.NodeConstraints.Drag) {
                node.constraints = ej.diagrams.NodeConstraints.PointerEvents | ej.diagrams.NodeConstraints.Select;
            } else {
                node.constraints = ej.diagrams.NodeConstraints.Default;
            }
        }
        for (var j = 0; j < diagram.ej2_instances[0].selectedItems.connectors.length; j++) {
            var connector = diagram.ej2_instances[0].selectedItems.connectors[j];
            if (connector.constraints & ej.diagrams.ConnectorConstraints.Drag) {
                connector.constraints = ej.diagrams.ConnectorConstraints.PointerEvents | ej.diagrams.ConnectorConstraints.Select;
            } else {
                connector.constraints = ej.diagrams.ConnectorConstraints.Default;
            }
        }
        diagram.ej2_instances[0].dataBind();
    }
    // To flip diagram objects
    flipObjects(flipType) {
        var selectedObjects = diagram.ej2_instances[0].selectedItems.nodes.concat(diagram.ej2_instances[0].selectedItems.connectors);
        for (let i = 0; i < selectedObjects.length; i++) {
            selectedObjects[i].flip ^= flipType === 'Flip Horizontal' ? ej.diagrams.FlipDirection.Horizontal : ej.diagrams.FlipDirection.Vertical;
        }
        diagram.ej2_instances[0].dataBind();
    }
    menuClick(args) {
        var buttonElement = document.getElementsByClassName('e-btn-hover')[0];
        if (buttonElement) {
            buttonElement.classList.remove('e-btn-hover');
        }
        var option = args.item.text;
        switch (option) {
            case 'New':
                diagram.ej2_instances[0].clear();
                break;
            case 'Save':
                this.download(diagram.ej2_instances[0].saveDiagram());
                break;
            case 'Print':
                this.btnPrintClick();
                break;
            case 'Export':
                exportDialog.ej2_instances[0].show();
                break;
            case 'Open':
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                break;
            case 'Undo':
                diagram.ej2_instances[0].undo();
                break;
            case 'Redo':
                diagram.ej2_instances[0].redo();
                break;
            case 'Cut':
                diagram.ej2_instances[0].cut();
                break;
            case 'Copy':
                diagram.ej2_instances[0].copy();
                break;
            case 'Paste':
                diagram.ej2_instances[0].paste();
                break;
            case 'Rotate Right 90':
                diagram.ej2_instances[0].rotate(diagram.ej2_instances[0].selectedItems, 90);
                break;
            case 'Rotate Left 90':
                diagram.ej2_instances[0].rotate(diagram.ej2_instances[0].selectedItems, -90);
                break;
            case 'Flip Vertical':
                this.flipObjects(option);
                break;
            case 'Flip Horizontal':
                this.flipObjects(option);
                break;
            case 'Delete':
                diagram.ej2_instances[0].remove();
            case 'Send To Back':
                diagram.ej2_instances[0].sendToBack();
                break;
            case 'Bring To Front':
                diagram.ej2_instances[0].bringToFront();
                break;
            case 'Send Backward':
                diagram.ej2_instances[0].sendBackward();
                break;
            case 'Bring Forward':
                diagram.ej2_instances[0].moveForward();
                break;
            case 'Landscape':
                args.item.parentObj.items[1].iconCss = '';
                args.item.iconCss = 'sf-icon-check-tick';
                diagram.ej2_instances[0].pageSettings.orientation = 'Landscape';
                document.getElementById('pageLandscape').classList.add('e-active');
                document.getElementById('pagePortrait').classList.remove('e-active');
                break;
            case 'Portrait':
                args.item.parentObj.items[0].iconCss = '';
                args.item.iconCss = 'sf-icon-check-tick';
                diagram.ej2_instances[0].pageSettings.orientation = 'Portrait';
                document.getElementById('pagePortrait').classList.add('e-active');
                document.getElementById('pageLandscape').classList.remove('e-active');
                break;
            case 'Letter (8.5 in x 11 in)':
            case 'Legal (8.5 in x 14 in)':
            case 'A3 (297 mm x 420 mm)':
            case 'A4 (210 mm x 297 mm)':
            case 'A5 (148 mm x 210 mm)':
            case 'A6 (105 mm x 148 mm)':
            case 'Tabloid (279 mm x 432 mm)':
                this.paperListChange(args)
                pageSettingsList.ej2_instances[0].text = args.item.text;
                this.updateSelection(args.item)
                break;
            case 'Select All':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].selectAll();
                break;
            case 'Select All Nodes':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].select(diagram.ej2_instances[0].nodes);
                break;
            case 'Select All Connectors':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].select(diagram.ej2_instances[0].connectors);
                break;
            case 'Deselect All':
                diagram.ej2_instances[0].clearSelection();
                break;
            case 'Selection Tool':
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.Default;
                this.removeSelectedToolbarItem();
                break;
            case 'Pan Tool':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ZoomPan;
                this.removeSelectedToolbarItem();
                break;
            case 'Orthogonal':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].drawingObject.sourceID = '';
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.ej2_instances[0].selectedItems.userHandles = [];
                diagram.ej2_instances[0].drawingObject.type = 'Orthogonal';
                diagram.ej2_instances[0].drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
                this.removeSelectedToolbarItem();
                break;
            case 'Straight':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].drawingObject.sourceID = '';
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.ej2_instances[0].selectedItems.userHandles = [];
                diagram.ej2_instances[0].drawingObject.type = 'Straight';
                diagram.ej2_instances[0].drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
                this.removeSelectedToolbarItem();
                break;
            case 'Bezier':
                diagram.ej2_instances[0].clearSelection();
                diagram.ej2_instances[0].drawingObject.sourceID = '';
                diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ContinuousDraw;
                diagram.ej2_instances[0].selectedItems.userHandles = [];
                diagram.ej2_instances[0].drawingObject.type = 'Bezier';
                diagram.ej2_instances[0].drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
                this.removeSelectedToolbarItem();
                break;
            case 'Show Lines':
                diagram.ej2_instances[0].snapSettings.constraints = diagram.ej2_instances[0].snapSettings.constraints ^ ej.diagrams.SnapConstraints.ShowLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'Snap To Grid':
                diagram.ej2_instances[0].snapSettings.constraints = diagram.ej2_instances[0].snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToLines;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'Snap To Object':
                diagram.ej2_instances[0].snapSettings.constraints = diagram.ej2_instances[0].snapSettings.constraints ^ ej.diagrams.SnapConstraints.SnapToObject;
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                break;
            case 'Show Ruler':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                diagram.ej2_instances[0].rulerSettings.showRulers = !diagram.ej2_instances[0].rulerSettings.showRulers;
                break;
            case 'Show Page Breaks':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                diagram.ej2_instances[0].pageSettings.showPageBreaks = !diagram.ej2_instances[0].pageSettings.showPageBreaks;
                showPageBreaks.ej2_instances[0].checked = !showPageBreaks.ej2_instances[0].checked;
                break;
            case 'Show Multiple Page':
                args.item.iconCss = args.item.iconCss ? '' : 'sf-icon-check-tick';
                diagram.ej2_instances[0].pageSettings.multiplePage = !diagram.ej2_instances[0].pageSettings.multiplePage;
                break;
            case 'Fit To Width':
                diagram.ej2_instances[0].fitToPage({ mode: 'Width' });
                break;
            case 'Fit To Page':
                diagram.ej2_instances[0].fitToPage({ mode: 'Page', region: 'Content' });
                break;
        }
        if (option === 'Pan Tool') {
            if (toolbarObj.ej2_instances[0].items[3].cssClass.indexOf('tb-item-selected') === -1) {
                toolbarObj.ej2_instances[0].items[3].cssClass += ' tb-item-selected';
            }
        }
        else if (option === 'Selection Tool') {
            if (toolbarObj.ej2_instances[0].items[4].cssClass.indexOf('tb-item-selected') === -1) {
                toolbarObj.ej2_instances[0].items[4].cssClass += ' tb-item-selected';
            }
        }
        else if (option === 'Orthogonal' || option === 'Straight' || option === 'Bezier') {
            document.getElementById('conTypeBtn').classList.add('tb-item-selected');
        }
        diagram.ej2_instances[0].dataBind();
    }

    download(data) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([data], { type: 'data:text/json;charset=utf-8,' });
            window.navigator.msSaveOrOpenBlob(blob, 'Diagram.json');
        } else {
            var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(data);
            var a = document.createElement('a');
            a.href = dataStr;
            a.download = document.getElementById('diagramName').innerHTML + '.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    }

    updateSelection(item) {
        for (let i = 0; i < item.parentObj.items.length; i++) {
            if (item.text === item.parentObj.items[i].text) {
                item.parentObj.items[i].iconCss = 'sf-icon-check-tick';
            } else {
                item.parentObj.items[i].iconCss = '';
            }
        }
    }

    onConnectorSelect(args) {
        diagram.ej2_instances[0].clearSelection();
        diagram.ej2_instances[0].drawingObject.sourceID = '';
        diagram.ej2_instances[0].drawingObject.type = args.item.text;
        diagram.ej2_instances[0].drawingObject.shape = { type: 'Bpmn', sequence: 'Normal' };
        diagram.ej2_instances[0].tool = ej.diagrams.DiagramTools.ContinuousDraw;
        diagram.ej2_instances[0].selectedItems.userHandles = [];
        diagram.ej2_instances[0].dataBind();
        this.removeSelectedToolbarItem();
        document.getElementById('conTypeBtn').classList.add('tb-item-selected');
    }

    removeSelectedToolbarItem() {
        for (let i = 0; i < toolbarObj.ej2_instances[0].items.length; i++) {
            let item = toolbarObj.ej2_instances[0].items[i];
            if (item.cssClass.indexOf('tb-item-selected') !== -1) {
                item.cssClass = item.cssClass.replace(' tb-item-selected', '');
            }
        }
        toolbarObj.ej2_instances[0].dataBind();
        document.getElementById('conTypeBtn').classList.remove('tb-item-selected');
    }

    getPaperSize(args) {
        const paperSize = {};
        switch (args) {
            case 'Letter':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1056;
                break;
            case 'Legal':
                paperSize.pageWidth = 816;
                paperSize.pageHeight = 1344;
                break;
            case 'Tabloid':
                paperSize.pageWidth = 1056;
                paperSize.pageHeight = 1632;
                break;
            case 'A0':
                paperSize.pageWidth = 3179;
                paperSize.pageHeight = 4494;
                break;
            case 'A1':
                paperSize.pageWidth = 2245;
                paperSize.pageHeight = 3179;
                break;
            case 'A2':
                paperSize.pageWidth = 1587;
                paperSize.pageHeight = 2245;
                break;
            case 'A3':
                paperSize.pageWidth = 1122;
                paperSize.pageHeight = 1587;
                break;
            case 'A4':
                paperSize.pageWidth = 793;
                paperSize.pageHeight = 1122;
                break;
            case 'A5':
                paperSize.pageWidth = 559;
                paperSize.pageHeight = 793;
                break;
            case 'A6':
                paperSize.pageWidth = 396;
                paperSize.pageHeight = 559;
                break;
        }
        return paperSize
    }

    paperListChange(args) {
        document.getElementById('pageDimension').style.display = 'none';
        document.getElementById('pageOrientation').style.display = '';
        const viewmenu = document.getElementById('diagram-menu').ej2_instances[0];  
        var value = args.value || args.item.value;
        var paperSize = this.getPaperSize(value);
        var pageWidth = paperSize.pageWidth;
        var pageHeight = paperSize.pageHeight;
        if (pageWidth && pageHeight) {
            if (diagram.ej2_instances[0].pageSettings.orientation === 'Portrait') {
                if (pageWidth > pageHeight) {
                    var temp = pageWidth;
                    pageWidth = pageHeight;
                    pageHeight = temp;
                }
            } else {
                if (pageHeight > pageWidth) {
                    var temp = pageHeight;
                    pageHeight = pageWidth;
                    pageWidth = temp;
                }
            }
            diagram.ej2_instances[0].pageSettings.width = pageWidth;
            diagram.ej2_instances[0].pageSettings.height = pageHeight;
        } else {
            document.getElementById('pageOrientation').style.display = 'none';
            document.getElementById('pageDimension').style.display = '';
            diagram.ej2_instances[0].pageSettings.width = 1460;
            diagram.ej2_instances[0].pageSettings.height = 600;
        }
        this.updatePaperSelection(viewmenu.items[2], args.value);
        diagram.ej2_instances[0].dataBind();
    }

    pageOrientationChange(args) {
        const btnViewMenu = document.getElementById('diagram-menu').ej2_instances[0];
        if (args.target) {
            let target = args.target;
            let items = btnViewMenu.items[2].items;
            var option = target.id ? target.id : (args.currentTarget.ej2_instances[0].iconCss === 'sf-icon-portrait' ? 'pagePortrait' : 'pageLandscape');
            switch (option) {
                case 'pagePortrait':
                    diagram.ej2_instances[0].pageSettings.isPortrait = true;
                    diagram.ej2_instances[0].pageSettings.isLandscape = false;
                    diagram.ej2_instances[0].pageSettings.orientation = 'Portrait';
                    items[0].items[0].iconCss = '';
                    items[0].items[1].iconCss = 'sf-icon-check-tick';
                    document.getElementById('pageLandscape').classList.remove('e-active');
                    break;
                case 'pageLandscape':
                    diagram.ej2_instances[0].pageSettings.isPortrait = false;
                    diagram.ej2_instances[0].pageSettings.isLandscape = true;
                    diagram.ej2_instances[0].pageSettings.orientation = 'Landscape';
                    items[0].items[0].iconCss = 'sf-icon-check-tick';
                    items[0].items[1].iconCss = '';
                    document.getElementById('pagePortrait').classList.remove('e-active');
                    break;
            }
            diagram.ej2_instances[0].dataBind();
        }
    }

    pageDimensionChange(args) {
        if (args.event) {
            let pageWidth = Number(diagram.ej2_instances[0].pageSettings.width);
            let pageHeight = Number(diagram.ej2_instances[0].pageSettings.height);
            var target = args.event.target;
            if (target.tagName.toLowerCase() === 'span') {
                target = target.parentElement.children[0];
            }
            if (target.id === 'pageWidth') {
                pageWidth = Number(target.value.replace(/,/g, ''));
            } else {
                pageHeight = Number(target.value.replace(/,/g, ''));
            }
            if (pageWidth && pageHeight) {
                if (pageWidth > pageHeight) {
                    diagram.ej2_instances[0].pageSettings.isPortrait = false;
                    diagram.ej2_instances[0].pageSettings.isLandscape = true;
                    diagram.ej2_instances[0].pageSettings.orientation = 'Landscape';
                } else {
                    diagram.ej2_instances[0].pageSettings.isPortrait = true;
                    diagram.ej2_instances[0].pageSettings.isLandscape = false;
                    diagram.ej2_instances[0].pageSettings.orientation = 'Portrait';
                }
                diagram.ej2_instances[0].pageSettings.width = pageWidth;
                diagram.ej2_instances[0].pageSettings.height = pageHeight;
                diagram.ej2_instances[0].dataBind();
            }
        }
    }

    pageBackgroundChange1(args) {
        if (args.currentValue) {
            diagram.ej2_instances[0].pageSettings.background = {
                color: args.currentValue.rgba
            };
            // document.getElementById('background').style.display = 'none';
            diagram.ej2_instances[0].dataBind();
        }
    }

    pageBreaksChange(args) {
        if (args.event) {
            diagram.ej2_instances[0].pageSettings.showPageBreaks = args.checked;
            diagram.ej2_instances[0].dataBind();
        }
    }

    updatePaperSelection(items, value) {
        for (let i = 0; i < items.items.length; i++) {
            if (value === items.items[i].value) {
                items.items[i].iconCss = 'sf-icon-check-tick';
            } else {
                items.items[i].iconCss = '';
            }
        }
    }

    updateTextAlign(textAlign) {
        var toolbarTextSubAlignment = document.getElementById('toolbarTextSubAlignment');
        if (toolbarTextSubAlignment) {
            toolbarTextSubAlignment = toolbarTextSubAlignment.ej2_instances[0];
        }
        if (toolbarTextSubAlignment) {
            for (var i = 0; i < toolbarTextSubAlignment.items.length; i++) {
                toolbarTextSubAlignment.items[i].cssClass = toolbarTextSubAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = textAlign === 'Left' ? 0 : (textAlign === 'Center' ? 1 : 2);
            toolbarTextSubAlignment.items[index].cssClass = toolbarTextSubAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    updateTextProperties(propertyName, propertyValue, annotation) {
        switch (propertyName) {
            case 'bold':
                annotation.bold = !annotation.bold;
                this.updateToolbarState('toolbarTextStyle', annotation.bold, 0);
                break;
            case 'italic':
                annotation.italic = !annotation.italic;
                this.updateToolbarState('toolbarTextStyle', annotation.italic, 1);
                break;
            case 'underline':
                textProperties.textDecoration = !textProperties.textDecoration;
                annotation.textDecoration = annotation.textDecoration === 'None' || !annotation.textDecoration ? 'Underline' : 'None';
                this.updateToolbarState('toolbarTextStyle', annotation.textDecoration !== 'None', 2);
                break;
            case 'aligntextleft':
            case 'aligntextright':
            case 'aligntextcenter':
                annotation.textAlign = propertyValue.toString().replace('AlignText', '');
                this.updateTextAlign(annotation.textAlign);
                break;
        }
    }

    updateTextFontProperties(propertyName, annotation, args) {
        switch (propertyName) {
            case 'fontfamily':
                annotation.fontFamily = args.propertyValue.value;
                break;
            case 'fontsize':
                annotation.fontSize = args.propertyValue.value;
                break;
            case 'fontcolor':
                annotation.color = this.getColor(args.propertyValue.value);
                break;
            case 'opacity':
                annotation.opacity = args.propertyValue.value/ 100;
                document.getElementById("textOpacityText").value = args.propertyValue.value + '%';
                break;
        }
    }

    updateHorVertAlign(horizontalAlignment, verticalAlignment) {
        this.updateHorAlign(horizontalAlignment);
        this.updateVerAlign(verticalAlignment);
    }

    updateHorAlign(horizontalAlignment) {
        var toolbarHorAlignment = document.getElementById('toolbarTextAlignmentLeft');
        if (toolbarHorAlignment) {
            toolbarHorAlignment = toolbarHorAlignment.ej2_instances[0];
        }
        if (toolbarHorAlignment) {
            for (var i = 0; i < toolbarHorAlignment.items.length; i++) {
                toolbarHorAlignment.items[i].cssClass = toolbarHorAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = horizontalAlignment === 'Right' ? 0 : (horizontalAlignment === 'Center' ? 1 : 2);
            toolbarHorAlignment.items[index].cssClass = toolbarHorAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    updateVerAlign(verticalAlignment) {
        var toolbarVerAlignment = document.getElementById('toolbarTextAlignmentTop');
        if (toolbarVerAlignment) {
            toolbarVerAlignment = toolbarVerAlignment.ej2_instances[0];
        }
        if (toolbarVerAlignment) {
            for (var i = 0; i < toolbarVerAlignment.items.length; i++) {
                toolbarVerAlignment.items[i].cssClass = toolbarVerAlignment.items[i].cssClass.replace(' tb-item-selected', '');
            }
            var index = verticalAlignment === 'Bottom' ? 0 : (verticalAlignment === 'Center' ? 1 : 2);
            toolbarVerAlignment.items[index].cssClass = toolbarVerAlignment.items[index].cssClass + ' tb-item-selected';
        }
    }

    getPosition(offset) {
        if (offset.x === 0 && offset.y === 0) {
            return 'TopLeft';
        } else if (offset.x === 0.5 && offset.y === 0) {
            return 'TopCenter';
        } else if (offset.x === 1 && offset.y === 0) {
            return 'TopRight';
        } else if (offset.x === 0 && offset.y === 0.5) {
            return 'MiddleLeft';
        } else if (offset.x === 1 && offset.y === 0.5) {
            return 'MiddleRight';
        } else if (offset.x === 0 && offset.y === 1) {
            return 'BottomLeft';
        } else if (offset.x === 0.5 && offset.y === 1) {
            return 'BottomCenter';
        } else if (offset.x === 1 && offset.y === 1) {
            return 'BottomRight';
        } else {
            return 'Center';
        }
    }

    getHexColor(colorStr) {
        var a = document.createElement('div');
        a.style.color = colorStr;
        var colors = window.getComputedStyle(document.body.appendChild(a)).color.match(/\d+/g).map(function (a) {
            return parseInt(a, 10);
        });
        document.body.removeChild(a);
        return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : '';
    }

    getColor(colorName) {
        if (window.navigator.msSaveBlob && colorName.length === 9) {
            return colorName.substring(0, 7);
        }
        return colorName;
    }

    getOffset(position) {
        switch (position.toLowerCase()) {
            case 'topleft':
                return { x: 0, y: 0 };
            case 'topcenter':
                return { x: 0.5, y: 0 };
            case 'topright':
                return { x: 1, y: 0 };
            case 'middleleft':
                return { x: 0, y: 0.5 };
            default:
                return { x: 0.5, y: 0.5 };
            case 'middleright':
                return { x: 1, y: 0.5 };
            case 'bottomleft':
                return { x: 0, y: 1 };
            case 'bottomcenter':
                return { x: 0.5, y: 1 };
            case 'bottomright':
                return { x: 1, y: 1 };
        }
    }

    updateToolbarState(toolbarName, isSelected, index) {
        var toolbarTextStyle = document.getElementById(toolbarName);
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            var cssClass = toolbarTextStyle.items[index].cssClass;
            toolbarTextStyle.items[index].cssClass = isSelected ? cssClass + ' tb-item-selected' : cssClass.replace(' tb-item-selected', '');
            toolbarTextStyle.dataBind();
        }
    }

    applyNodeStyle(propertyName, node, value) {
        var addInfo = node.addInfo || {};
        var Value = value.value
        switch (propertyName) {
            case 'fillcolor':
                node.style.fill = this.getColor(value);
                // nodeFillColor.value = nodeProperties.fillColor;
                if (value && value.checked) {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'strokecolor':
                node.style.strokeColor = this.getColor(Value);
                break;
            case 'strokewidth':
                node.style.strokeWidth = Value;
                break;
            case 'strokestyle':
                node.style.strokeDashArray = Value;
                break;
            case 'opacity':
                node.style.opacity = Value / 100;
                document.getElementById("nodeOpacitySliderText").value = Value + '%';
                break;
            case 'gradient':
                if (value && value.value === 'Solid') {
                    node.style.gradient.type = 'None';
                }
                else {
                    NodeProperties.prototype.getGradient(node);
                }
                break;
            case 'gradientdirection':
            case 'gradientcolor':
                NodeProperties.prototype.getGradient(node);
                break;
        }
    }

    toolbarInsertClick(args) {
        if (diagram.ej2_instances[0].selectedItems.nodes.length > 0) {
            document.getElementById('hyperlink').value = '';
            document.getElementById('hyperlinkText').value = '';
            if (diagram.ej2_instances[0].selectedItems.nodes[0].annotations.length > 0) {
                var annotation = diagram.ej2_instances[0].selectedItems.nodes[0].annotations[0];
                if (annotation.hyperlink.link || annotation.content) {
                    document.getElementById('hyperlink').value = annotation.hyperlink.link;
                    document.getElementById('hyperlinkText').value = annotation.hyperlink.content || annotation.content;
                }
            }
            hyperlinkDialog.ej2_instances[0].show();
        }
    }

   

    getDialogButtons(dialogType) {
        var buttons = [];
        switch (dialogType) {
            case 'export':
                buttons.push({
                    click: this.btnExportClick.bind(this), buttonModel: { content: 'Export', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'print':
                buttons.push({
                    click: this.btnPrintClick.bind(this),
                    buttonModel: { content: 'Print', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
            case 'hyperlink':
                buttons.push({
                    click: this.btnHyperLink.bind(this),
                    buttonModel: { content: 'Apply', cssClass: 'e-flat e-db-primary', isPrimary: true }
                });
                break;
        }
        buttons.push({
            click: this.btnCancelClick.bind(this),
            buttonModel: { content: 'Cancel', cssClass: 'e-flat', isPrimary: true }
        });
        return buttons;
    }

    btnHyperLink() {
        var node = diagram.ej2_instances[0].selectedItems.nodes[0];
        if (node.annotations.length > 0) {
            node.annotations[0].hyperlink.link = document.getElementById('hyperlink').value;
            node.annotations[0].hyperlink.content = document.getElementById('hyperlinkText').value;
            this.applyToolTipforHyperlink(node);
            diagram.ej2_instances[0].dataBind();
        } else {
            var annotation = {
                hyperlink: {
                    content: document.getElementById('hyperlinkText').value,
                    link: document.getElementById('hyperlink').value
                }
            };
            diagram.ej2_instances[0].addLabels(node, [annotation]);
            this.applyToolTipforHyperlink(node);
            diagram.ej2_instances[0].dataBind();
        }
        hyperlinkDialog.ej2_instances[0].hide();
    }

    applyToolTipforHyperlink(node) {
        node.constraints = ej.diagrams.NodeConstraints.Default & ~ej.diagrams.NodeConstraints.InheritTooltip | ej.diagrams.NodeConstraints.Tooltip;
        node.tooltip = {
            content: node.annotations[0].hyperlink.link, relativeMode: 'Object',
            position: 'TopCenter', showTipPointer: true,
        };
    }

    btnPrintClick() {
        diagram.ej2_instances[0].print({
            region: 'Content',
            multiplePage: diagram.ej2_instances[0].pageSettings.multiplePage,
        });
    }

    btnExportClick() {
        
        diagram.ej2_instances[0].exportDiagram({
            fileName: document.getElementById("exportfileName").value,
            format: exportFormat.value,
            region: exportRegion.value,
            multiplePage: diagram.ej2_instances[0].pageSettings.multiplePage,
        });
        exportDialog.ej2_instances[0].hide();
    }

    btnCancelClick(args) {
        var ss = args.target;
        var key = ss.offsetParent.id;
        switch (key) {
            case 'exportDialog':
                exportDialog.hide();
                break;
            case 'hyperlinkDialog':
                hyperlinkDialog.hide();
                break;
        }
    }

}
module.exports = UtilityMethods;