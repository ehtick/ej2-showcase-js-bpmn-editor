const UtilityMethods = require('./utilitymethods.js');
const nodeProperties = require('./common.js');
const textProperties = require('./common.js');
const connectorProperties = require('./common.js');
const {

    TextProperties,
} = require('./common.js');

class DiagramClientSideEvents {
    constructor() {
        this.drawingNode;
        this.handles = [
            {
                name: 'Clone', pathData: 'M0,2.4879999 L0.986,2.4879999 0.986,9.0139999 6.9950027,9.0139999 6.9950027,10 0.986,10 C0.70400238,10 0.47000122,9.9060001 0.28100207,9.7180004 0.09400177,9.5300007 0,9.2959995 0,9.0139999 z M3.0050011,0 L9.0140038,0 C9.2960014,0 9.5300026,0.093999863 9.7190018,0.28199956 9.906002,0.47000027 10,0.70399952 10,0.986 L10,6.9949989 C10,7.2770004 9.906002,7.5160007 9.7190018,7.7110004 9.5300026,7.9069996 9.2960014,8.0049992 9.0140038,8.0049992 L3.0050011,8.0049992 C2.7070007,8.0049992 2.4650002,7.9069996 2.2770004,7.7110004 2.0890007,7.5160007 1.9950027,7.2770004 1.9950027,6.9949989 L1.9950027,0.986 C1.9950027,0.70399952 2.0890007,0.47000027 2.2770004,0.28199956 2.4650002,0.093999863 2.7070007,0 3.0050011,0 z', tooltip: { content: 'Clone' },
                visible: true, offset: 1, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
            },
            {
                name: 'Delete', pathData: 'M0.54700077,2.2130003 L7.2129992,2.2130003 7.2129992,8.8800011 C7.2129992,9.1920013 7.1049975,9.4570007 6.8879985,9.6739998 6.6709994,9.8910007 6.406,10 6.0939997,10 L1.6659999,10 C1.3539997,10 1.0890004,9.8910007 0.87200136,9.6739998 0.65500242,9.4570007 0.54700071,9.1920013 0.54700077,8.8800011 z M2.4999992,0 L5.2600006,0 5.8329986,0.54600048 7.7599996,0.54600048 7.7599996,1.6660004 0,1.6660004 0,0.54600048 1.9270014,0.54600048 z', tooltip: { content: 'Delete' },
                visible: true, offset: 0, side: 'Bottom', margin: { top: 0, bottom: 0, left: 0, right: 0 }
            },
            {
                name: 'Draw', pathData: 'M3.9730001,0 L8.9730001,5.0000007 3.9730001,10.000001 3.9730001,7.0090005 0,7.0090005 0,2.9910006 3.9730001,2.9910006 z', tooltip: { content: 'Draw' },
                visible: true, offset: 0.5, side: 'Right', margin: { top: 0, bottom: 0, left: 0, right: 0 }
            },
        ];
    }
    singleItemTick(args, index, boolean) {
        if (boolean) {
            if (args.items[index].iconCss.indexOf('sf-icon-check-tick') === -1) {
                args.items[index].iconCss += ' sf-icon-check-tick';
            }
        }
        else {
            if (args.items[index].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                args.items[index].iconCss = args.items[index].iconCss.replace(' sf-icon-check-tick', '');
            }
        }
    }
    updateContextMenuSelection(boolean, args) {
        if (diagram.ej2_instances[0].selectedItems.nodes.length > 0) {
            var bpmnNode = diagram.ej2_instances[0].selectedItems.nodes[0];
            var checked = boolean;
            if (bpmnNode.shape.shape === 'Gateway') {
                if (!args.parentItem) {
                   for(var i=0; i < args.items[21].items.length; i++) {
                        if ((bpmnNode.shape.gateway.type === args.items[21].items[i].text || bpmnNode.shape.gateway.type === args.items[21].items[i].id) || !checked) {
                            this.addTick(args, 21, checked, i);
                        }
                    }
                }
            }
            else if (bpmnNode.shape.shape === 'Activity') {
                if (!args.parentItem) {
                    if (bpmnNode.shape.activity.activity === 'Task') {
                       for(var i=0; i < args.items[13].items.length; i++) {
                            if (bpmnNode.shape.activity.activity === args.items[13].items[i].id || !checked) {
                                this.addTick(args, 13, checked, i);
                            }
                        }
                       for(var i=0; i < args.items[20].items.length; i++) {
                            if (bpmnNode.shape.activity.task.type === args.items[20].items[i].id || !checked) {
                                this.addTick(args, 20, checked, i);
                            }
                        }
                        if (bpmnNode.shape.activity.task.call) {
                            this.singleItemTick(args, 17, true);
                        }
                        else {
                            this.singleItemTick(args, 17, false, i);
                        }
                       for(var i=0; i < args.items[11].items.length; i++) {
                            if ((bpmnNode.shape.activity.task.loop === args.items[11].items[i].text || bpmnNode.shape.activity.task.loop === args.items[11].items[i].id) || !checked) {
                                this.addTick(args, 11, checked, i);
                            }
                        }
                        if (bpmnNode.shape.activity.task.compensation) {
                            this.singleItemTick(args, 12, true);
                        }
                        else {
                            this.singleItemTick(args, 12, false);
                        }
                    }
                    else if (bpmnNode.shape.activity.activity === 'SubProcess') {
                       for(var i=0; i < args.items[13].items.length; i++) {
                            if (bpmnNode.shape.activity.activity === args.items[13].items[i].id || !checked) {
                                this.addTick(args, 13, checked, i, i);
                            }
                        }
                       for(var i=0; i < args.items[11].items.length; i++) {
                            if ((bpmnNode.shape.activity.subProcess.loop === args.items[11].items[i].text || bpmnNode.shape.activity.subProcess.loop === args.items[11].items[i].id) || !checked) {
                                this.addTick(args, 11, checked, i);
                            }
                        }
                       for(var i=0; i < args.items[14].items.length; i++) {
                            if ((bpmnNode.shape.activity.subProcess.boundary === args.items[14].items[i].text || bpmnNode.shape.activity.subProcess.boundary === args.items[14].items[i].id) || !checked) {
                                this.addTick(args, 14, checked, i);
                            }
                        }
                        if (bpmnNode.shape.activity.subProcess.compensation) {
                            this.singleItemTick(args, 12, true);
                        }
                        else {
                            this.singleItemTick(args, 12, false);
                        }
                        if (bpmnNode.shape.activity.subProcess.adhoc) {
                            this.singleItemTick(args, 10, true);
                        }
                        else {
                            this.singleItemTick(args, 10, false);
                        }
                    }
                }
            }
            else if (bpmnNode.shape.shape === 'Event') {
                if (!args.parentItem) {
                   for(var i=0; i < args.items[19].items.length; i++) {
                        if ((bpmnNode.shape.event.event === args.items[19].items[i].text || bpmnNode.shape.event.event === args.items[19].items[i].id) || !checked) {
                            this.addTick(args, 19, checked, i);
                        }
                    }
                   for(var i=0; i < args.items[18].items.length; i++) {
                        if (bpmnNode.shape.event.trigger === args.items[18].items[i].text || !checked) {
                            this.addTick(args, 18, checked, i);
                        }
                    }
                }
            }
            else if (bpmnNode.shape.shape === 'DataObject') {
                if (!args.parentItem) {
                   for(var i=0; i < args.items[15].items.length; i++) {
                        if (bpmnNode.shape.dataObject.type === args.items[15].items[i].text || !checked) {
                            this.addTick(args, 15, checked, i);
                        }
                    }
                    if (bpmnNode.shape.dataObject.collection) {
                        this.singleItemTick(args, 16, true);
                    }
                    else {
                        this.singleItemTick(args, 16, false);
                    }
                }
            }
        }
        if (diagram.ej2_instances[0].selectedItems.connectors.length > 0) {
            var bpmnConnector = diagram.ej2_instances[0].selectedItems.connectors[0];
            var checked = boolean;
            if (bpmnConnector.shape.type === 'Bpmn') {
                if (bpmnConnector.shape.flow === 'Association') {
                    if (!args.parentItem) {
                       for(var i=0; i < args.items[9].items.length; i++) {
                            if ((bpmnConnector.shape.association === args.items[9].items[i].id || bpmnConnector.shape.association === args.items[9].items[i].text) || !checked) {
                                this.addTick(args, 9, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, true);
                        this.singleItemTick(args, 6, false);
                        this.singleItemTick(args, 7, false);
                    }
                }
                if (bpmnConnector.shape.flow === 'Sequence') {
                    if (!args.parentItem) {
                       for(var i=0; i < args.items[8].items.length; i++) {
                            if ((bpmnConnector.shape.sequence === args.items[8].items[i].text || bpmnConnector.shape.sequence === args.items[8].items[i].id) || !checked) {
                                this.addTick(args, 8, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, false);
                        this.singleItemTick(args, 6, true);
                        this.singleItemTick(args, 7, false);
                    }
                }
                if (bpmnConnector.shape.flow === 'Message') {
                    if (!args.parentItem) {
                       for(var i=0; i < args.items[22].items.length; i++) {
                            if ((bpmnConnector.shape.message === args.items[22].items[i].text || bpmnConnector.shape.message === args.items[22].items[i].id) || !checked) {
                                this.addTick(args, 22, checked, i);
                            }
                        }
                        this.singleItemTick(args, 5, false);
                        this.singleItemTick(args, 6, false);
                        this.singleItemTick(args, 7, true);
                    }
                }
            }
        }

    }
    updateNodePropertiesInView(selectedItems) {
        if (selectedItems.nodes.length) {
            let node = selectedItems.nodes[0];
            const nodeOffsetX = document.getElementById('nodeOffsetX').ej2_instances[0];
            const nodeOffsetY = document.getElementById('nodeOffsetY').ej2_instances[0];
            const nodeWidth = document.getElementById('nodeWidth').ej2_instances[0];
            const nodeHeight = document.getElementById('nodeHeight').ej2_instances[0];
            const nodeAngle = document.getElementById('nodeRotateAngle').ej2_instances[0];
            const nodeStrokeWidth = document.getElementById('nodeStrokeWidth').ej2_instances[0];
            const nodeOpacitySlider = document.getElementById('nodeOpacitySlider').ej2_instances[0];
            const fontFamily = document.getElementById('fontFamily').ej2_instances[0];
            const ddlTextPosition = document.getElementById('ddlTextPosition').ej2_instances[0];
            const opacityTextSlider = document.getElementById('opacityTextSlider').ej2_instances[0];
            const fontSizeTextProperties = document.getElementById('fontSizeTextProperties').ej2_instances[0];
            const nodeFillColor = document.getElementById('nodeFillColor').ej2_instances[0];
            const nodeStrokeColor = document.getElementById('nodeStrokeColor').ej2_instances[0];
            const textColor = document.getElementById('textColor').ej2_instances[0];
            const backgroundTypeDropdown = document.getElementById('backgroundTypeDropdown').ej2_instances[0];
            nodeOffsetX.value = node.offsetX;
            nodeOffsetY.value = node.offsetY;
            nodeWidth.value = node.width;
            nodeHeight.value = node.height;
            nodeAngle.value = node.rotateAngle;
            nodeStrokeWidth.value = node.style.strokeWidth;
            nodeOpacitySlider.value = node.style.opacity * 100;
            nodeFillColor.value = node.style.fill;
            nodeStrokeColor.value = node.style.strokeColor;
            backgroundTypeDropdown.value =  node.style.gradient.type !== 'None' ? 'Gradient' : 'Solid';
            if (node.annotations[0]) {
                fontFamily.value = node.annotations[0].style.fontFamily;
                ddlTextPosition.value = node.annotations[0].style.fontSize;
                opacityTextSlider.value = node.annotations[0].style.opacity * 100;
                fontSizeTextProperties.value = node.annotations[0].style.fontSize;
                textColor.value = node.annotations[0].style.color;
            }

        }
        else if (selectedItems.connectors.length) {
            let connector = selectedItems.connectors[0]
            const lineTypeDropdown = document.getElementById('lineTypeDropdown').ej2_instances[0];
            const lineStyle = document.getElementById('lineStyle').ej2_instances[0];
            const sourceType = document.getElementById('sourceType').ej2_instances[0];
            const sourceSize = document.getElementById('sourceSize').ej2_instances[0];
            const targetType = document.getElementById('targetType').ej2_instances[0];
            const targetSize = document.getElementById('targetSize').ej2_instances[0];
            const lineWidth = document.getElementById('lineWidth').ej2_instances[0];
            const default1 = document.getElementById('default1').ej2_instances[0];
            const lineJumpSize = document.getElementById('lineJumpSize').ej2_instances[0];
            const lineColor = document.getElementById('lineColor').ej2_instances[0];
            lineTypeDropdown.value = connector.type;
            lineStyle.value = connector.style.strokeDashArray;
            sourceType.value = connector.sourceDecorator.shape;
            sourceSize.value = connector.sourceDecorator.width;
            targetType.value = connector.targetDecorator.shape
            targetSize.value = connector.targetDecorator.width;
            lineWidth.value = connector.style.strokeWidth;
            default1.value = connector.style.opacity * 100;
            lineJumpSize.value = connector.bridgeSpace;
            lineColor.value = connector.style.strokeColor;
            if (connector.annotations[0]) {
                const opacityConnectorTextSlider = document.getElementById('opacityTextSlider').ej2_instances[0];
                opacityConnectorTextSlider.value = connector.annotations[0].style.opacity * 100;
            }

        }
    }
    enableToolbarItems(selectedItems) {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        var toolbarClassName = 'db-toolbar-container';
        if (toolbarContainer.classList.contains('db-undo')) {
            toolbarClassName += ' db-undo';
        }
        if (toolbarContainer.classList.contains('db-redo')) {
            toolbarClassName += ' db-redo';
        }
        toolbarContainer.className = toolbarClassName;
        if (selectedItems.length === 1) {
            toolbarContainer.className = toolbarContainer.className + ' db-select';
            if (selectedItems[0] instanceof ej.diagrams.Node) {
                if (selectedItems[0].children) {
                    if (selectedItems[0].children.length > 2) {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple db-node db-group';
                    }
                    else {
                        toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-node db-group';
                    }
                }
                else {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                }
            }
        }
        else if (selectedItems.length === 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double';
        }
        else if (selectedItems.length > 2) {
            toolbarContainer.className = toolbarContainer.className + ' db-select db-double db-multiple';
        }
        if (selectedItems.length > 1) {
            var isNodeExist = false;
            for (var i = 0; i < selectedItems.length; i++) {
                if (selectedItems[i] instanceof ej.diagrams.Node) {
                    toolbarContainer.className = toolbarContainer.className + ' db-select db-node';
                    break;
                }
            }
        }
    };
    //Create and add ports for node.
    getNodePorts(obj) {
        var ports = [
            { id: 'left', shape: 'Circle', offset: { x: 0, y: 0.5 } },
            { id: 'bottom', shape: 'Circle', offset: { x: 0.5, y: 1 } },
            { id: 'right', shape: 'Circle', offset: { x: 1, y: 0.5 } },
            { id: 'top', shape: 'Circle', offset: { x: 0.5, y: 0 } }
        ];
        return ports;
    }
    selectionChange(args) {
        {
            if (args.state === 'Changed') {
                var multiSelect;
                var selectedItems = diagram.ej2_instances[0].selectedItems.nodes;
                selectedItems = selectedItems.concat(diagram.ej2_instances[0].selectedItems.connectors);
                this.enableToolbarItems(selectedItems);
                this.updateNodePropertiesInView(diagram.ej2_instances[0].selectedItems);
                var nodeContainer = document.getElementById('nodePropertyContainer');
                nodeContainer.classList.remove('multiple');
                nodeContainer.classList.remove('connector');
                if (selectedItems.length > 1) {
                    multiSelect = true;
                    this.multipleSelectionSettings(selectedItems);
                    toolbarObj.ej2_instances[0].items[7].tooltipText = 'Group';
                    toolbarObj.ej2_instances[0].items[7].prefixIcon = 'sf-icon-group';
                    for (var i = 7; i <= 25; i++) {
                        toolbarObj.ej2_instances[0].items[i].visible = true;
                    }
                }
                else if (selectedItems.length === 1) {
                    multiSelect = false;

                    this.singleSelectionSettings(selectedItems[0]);
                    for (var i = 7; i <= 25; i++) {
                        if (i <= 16) {
                            toolbarObj.ej2_instances[0].items[i].visible = false;
                        }
                        else {
                            toolbarObj.ej2_instances[0].items[i].visible = true;

                        }
                    }
                    if (selectedItems[0].children && selectedItems[0].children.length > 0) {
                        toolbarObj.ej2_instances[0].items[7].tooltipText = 'UnGroup';
                        toolbarObj.ej2_instances[0].items[7].prefixIcon = 'sf-icon-ungroup';
                        toolbarObj.ej2_instances[0].items[7].visible = true;
                    }
                }
                else {
                    this.objectTypeChange('diagram');
                    for (var i = 7; i <= 25; i++) {
                        toolbarObj.ej2_instances[0].items[i].visible = false;
                    }
                }
                if (args.newValue.length > 0 && args.newValue[0] instanceof ej.diagrams.Node) {
                    diagram.ej2_instances[0].selectedItems = { constraints: ej.diagrams.SelectorConstraints.All | ej.diagrams.SelectorConstraints.UserHandle, userHandles: this.handles };
                    if (diagram.ej2_instances[0].selectedItems.nodes.length > 0) {
                        this.drawingNode = diagram.ej2_instances[0].selectedItems.nodes[diagram.ej2_instances[0].selectedItems.nodes.length - 1];
                    }
                }
                else {
                    diagram.ej2_instances[0].selectedItems = { constraints: ej.diagrams.SelectorConstraints.All & ~ej.diagrams.SelectorConstraints.UserHandle };
                }
            }
        }
    };
    //Scroll change event
    scrollChange(args) {
        if (args.panState !== 'Start') {
            var btn = document.getElementById('btnZoomIncrement').ej2_instances[0];
            btn.content = Math.round(diagram.ej2_instances[0].scrollSettings.currentZoom * 100) + ' %';
        }
    }
    positionChange(args) {
        if (diagram.ej2_instances[0].selectedItems.nodes.concat(diagram.ej2_instances[0].selectedItems.connectors).length === 1) {
            nodeProperties.m_offsetX = args.newValue.offsetX;
            nodeProperties.m_offsetY = args.newValue.offsetY;
            this.updateNodePropertiesInView(diagram.ej2_instances[0].selectedItems);
        }
    };
    sizeChange(args) {
        if (diagram.ej2_instances[0].selectedItems.nodes.concat(diagram.ej2_instances[0].selectedItems.connectors).length === 1) {
            nodeProperties.m_width = args.newValue.width;
            nodeProperties.m_height = args.newValue.height;
            nodeProperties.m_offsetX = args.newValue.offsetX;
            nodeProperties.m_offsetY = args.newValue.offsetY;
            this.updateNodePropertiesInView(diagram.ej2_instances[0].selectedItems);
        }
    };
    rotateChange(args) {
        if (args.state === 'Start' || args.state === 'Progress') {
            diagram.ej2_instances[0].selectedItems = { constraints: ej.diagrams.SelectorConstraints.None };
        }
        if (args.state === 'Completed') {
            diagram.ej2_instances[0].selectedItems = {
                constraints: ej.diagrams.SelectorConstraints.All | ej.diagrams.SelectorConstraints.UserHandle,
                userHandles: this.handles
            };
        }
        if (diagram.ej2_instances[0].selectedItems.nodes.concat(diagram.ej2_instances[0].selectedItems.connectors).length === 1) {
            nodeProperties.rotateAngle.value = args.newValue.rotateAngle;
        }
    };
    created(args) {
        diagram.ej2_instances[0].fitToPage({ mode: 'Page', region: 'Content' });
    };
    getNodeDefaults(obj) {
        obj.userHandles = [];
        obj.ports = this.getNodePorts(obj);
        return obj;
    };
    getConnectorDefaults(obj) {
        if (obj.annotations.length > 0) {
            obj.annotations[0].style.fill = 'White'
        }
        return obj;
    };
    viewSelectionChange(args) {
        const viewmenu = document.getElementById('diagram-menu').ej2_instances[0]; 
        var items =viewmenu.items[5].items;
        items[4].iconCss = diagram.ej2_instances[0].pageSettings.showPageBreaks ? 'sf-icon-check-tick' : '';
        items[5].iconCss = diagram.ej2_instances[0].pageSettings.multiplePage ? 'sf-icon-check-tick' : '';
        showPageBreaks.checked = diagram.ej2_instances[0].pageSettings.showPageBreaks ? true : false;
        pageBgColor.value = UtilityMethods.prototype.getHexColor(diagram.ej2_instances[0].pageSettings.background.color);

    }
    historyChange(args) {
        var toolbarContainer = document.getElementsByClassName('db-toolbar-container')[0];
        toolbarContainer.classList.remove('db-undo');
        toolbarContainer.classList.remove('db-redo');
        if (diagram.ej2_instances[0].historyManager.undoStack.length > 0) {
            toolbarContainer.classList.add('db-undo');
        }
        if (diagram.ej2_instances[0].historyManager.redoStack.length > 0) {
            toolbarContainer.classList.add('db-redo');
        }
        this.viewSelectionChange(args)
        // diagram.historyManager.undoStack.length>0?toolbarObj.items[6].disabled = false:toolbarObj.items[6].disabled = true
        // diagram.historyManager.redoStack.length>0?toolbarObj.items[7].disabled = false:toolbarObj.items[7].disabled = true
    };
    userHandleClick(args) {
        switch (args.element.name) {
            case 'Delete':
                diagram.ej2_instances[0].remove();
                break;
            case 'Clone':
                diagram.ej2_instances[0].paste(diagram.ej2_instances[0].selectedItems.selectedObjects);
                break;
            case 'Draw':
                if (diagram.ej2_instances[0].drawingObject !== undefined) {
                    diagram.ej2_instances[0].drawingObject.shape = {};
                    diagram.ej2_instances[0].drawingObject.type = diagram.ej2_instances[0].drawingObject.type ? diagram.ej2_instances[0].drawingObject.type : 'Orthogonal';
                    diagram.ej2_instances[0].drawingObject.sourceID = this.drawingNode.id;
                    diagram.ej2_instances[0].dataBind();
                }
                else {
                    diagram.ej2_instances[0].drawingObject = { type: 'Orthogonal', sourceID: this.drawingNode.id, shape: { type: 'Bpmn', sequence: 'Normal' } };
                }
                break;
        }
    }
    dragEnter(args) {
        if (args.element.type === 'Straight') {
            if (args.element.sourceDecorator && args.element.style.strokeDashArray === '4 4') {
                args.element.shape = {
                    type: 'Bpmn',
                    flow: 'Message',
                    message: 'Default'
                }
            }
        }
        else if (args.element.shape.shape === 'Activity') {
            if (args.element.shape.activity.activity === 'Task') {
                args.element.width = 96; args.element.height = 72;
            }
            else if (args.element.shape.activity.activity === 'SubProcess') {
                if (args.element.shape.activity.subProcess.collapsed) {
                    args.element.width = 96; args.element.height = 72;
                }
                else {
                    args.element.width = 576; args.element.height = 384;
                }
            }
        }
        else if (args.element.shape.shape === 'Event') {
            args.element.width = 50; args.element.height = 50;
        }
        else if (args.element.shape.shape === 'Gateway') {
            args.element.width = 60; args.element.height = 60;
        }
        else if (args.element.shape.shape === 'Message') {
            args.element.width = 72; args.element.height = 48;
        }
        else if (args.element.shape.shape === 'DataObject') {
            args.element.width = 48; args.element.height = 63;
        }
        else if (args.element.shape.shape === 'DataSource') {
            args.element.width = 96; args.element.height = 72;
        }
    };
    contextMenuClick(args) {
        if (args.item && args.item.items.length === 0) {
            if (diagram.ej2_instances[0].selectedItems.nodes.length > 0) {
                var bpmnShape = diagram.ej2_instances[0].selectedItems.nodes[0].shape;
                if (args.item.iconCss.indexOf('e-adhocs') > -1) {
                    bpmnShape.activity.subProcess.adhoc = !bpmnShape.activity.subProcess.adhoc;
                }
                if (args.item.iconCss.indexOf("e-event") > -1) {
                    bpmnShape.event.event = args.item.id;
                }
                if (args.item.iconCss.indexOf("e-trigger") > -1) {
                    bpmnShape.event.trigger = args.item.text;
                }
                if (args.item.iconCss.indexOf("e-loop") > -1) {
                    var loop = (args.item.id === 'LoopNone') ? 'None' : args.item.id;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.loop = loop;
                    }
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        bpmnShape.activity.subProcess.loop = loop;
                    }
                }
                if (args.item.iconCss.indexOf("e-compensation") > -1) {
                    // var compensation = (args.item.id === 'taskCompensation') ? true : false;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.compensation = !bpmnShape.activity.task.compensation;
                    }
                    if (bpmnShape.activity.activity === 'SubProcess') {
                        bpmnShape.activity.subProcess.compensation = !bpmnShape.activity.subProcess.compensation;
                    }
                }
                if (args.item.iconCss.indexOf('e-call') > -1) {
                    // var compensations = (args.item.id === 'CallNone') ? false : true;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.call = !bpmnShape.activity.task.call;
                    }
                }
                if (args.item.id === 'SubProcess' || args.item.id === 'Task') {
                    if (args.item.id === 'Task') {
                        bpmnShape.activity.activity = 'Task';
                        bpmnShape.activity.subProcess.collapsed = false;
                    }
                    else {
                        bpmnShape.activity.activity = 'SubProcess';
                        bpmnShape.activity.subProcess.collapsed = true;
                    }
                }
                if (args.item.iconCss.indexOf('e-boundry') > -1) {
                    call = args.item.id;
                    if (args.item.id !== 'Default') {
                        call = (args.item.id === 'BoundryEvent') ? 'Event' : 'Call';
                    }
                    bpmnShape.activity.subProcess.boundary = call;
                }
                if (args.item.iconCss.indexOf('e-data') > -1) {
                    var data = args.item.id === 'DataObjectNone' ? 'None' : args.item.id;
                    bpmnShape.dataObject.type = data;
                }
                if (args.item.iconCss.indexOf('e-collection') > -1) {
                    // var collection = (args.item.id === 'Collectioncollection') ? true : false;
                    bpmnShape.dataObject.collection = !bpmnShape.dataObject.collection;
                }
                if (args.item.iconCss.indexOf("e-task") > -1) {
                    var task = task === 'TaskNone' ? 'None' : args.item.id;
                    if (bpmnShape.activity.activity === 'Task') {
                        bpmnShape.activity.task.type = task;
                    }
                }
                if (args.item.iconCss.indexOf("e-gate") > -1) {
                    var gate = args.item.id.replace('Gateway', '');
                    if (bpmnShape.shape === 'Gateway') {
                        bpmnShape.gateway.type = gate;
                    }
                }
                diagram.ej2_instances[0].dataBind();
            }
            if (diagram.ej2_instances[0].selectedItems.connectors.length && diagram.ej2_instances[0].selectedItems.connectors[0].shape) {
                if (args.item.id === 'Association') {
                    diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow = 'Association';
                }
                if (args.item.id === 'Sequence') {
                    diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow = 'Sequence';
                }
                if (args.item.id === 'MessageFlow') {
                    diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow = 'Message';
                }
                if (args.item.id === 'None') {
                    diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow === 'Sequence' ?
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.sequence = 'Default' :
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow === 'Association' ?
                            diagram.ej2_instances[0].selectedItems.connectors[0].shape.association = 'Default' :
                            diagram.ej2_instances[0].selectedItems.connectors[0].shape.message = 'Default'
                        ;
                }
                if (args.item.id === 'Directional' || args.item.id === 'BiDirectional') {
                    args.item.id === 'Directional' ?
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.association = 'Directional' :
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.association = 'BiDirectional';
                }
                if (args.item.id === 'Conditional Flow' || args.item.id === 'Normal Flow') {
                    args.item.id === 'Conditional Flow' ?
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.sequence = 'Conditional' :
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.sequence = 'Normal';
                }
                if (args.item.id === 'InitiatingMessage' || args.item.id === 'NonInitiatingMessage') {
                    args.item.id === 'InitiatingMessage' ?
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.message = 'InitiatingMessage' :
                        diagram.ej2_instances[0].selectedItems.connectors[0].shape.message = 'NonInitiatingMessage';
                }
                diagram.ej2_instances[0].dataBind();
            }
            if (args.item.id === 'Cut') {
                diagram.ej2_instances[0].cut();
            } if (args.item.id === 'Copy') {
                diagram.ej2_instances[0].copy();
            } if (args.item.id === 'Paste') {
                diagram.ej2_instances[0].paste();
            } if (args.item.id === 'Delete') {
                diagram.ej2_instances[0].remove();
            }
            if (args.item.id === 'SelectAll') {
                diagram.ej2_instances[0].selectAll();
            }
            if (args.item.id === 'TextAnnotation') {
                diagram.ej2_instances[0].addTextAnnotation({ id: 'newAnnotation_'+ ej.diagrams.randomId(), text: 'Text', length: 150, angle: 290 }, diagram.ej2_instances[0].selectedItems.nodes[0])
            }
        }
    };
    contextMenuOpen(args) {
        this.updateContextMenuSelection(false, args)
        var hiddenId = [];
        if (args.element.className !== 'e-menu-parent e-ul ') {
            hiddenId = ['Adhoc', 'Loop', 'taskCompensation', 'Activity-Type', 'Boundary', 'DataObject',
                'collection', 'DeftCall', 'TriggerResult', 'EventType', 'TaskType', 'GateWay', 'Copy', 'Paste', 'Cut', 'SelectAll', 'Delete',
                'Association', 'Sequence', 'MessageFlow', 'Condition type', 'Direction', 'MessageType', 'TextAnnotation'];
        }
        for (var i = 0; i < args.items.length; i++) {
            if (args.items[i].text === 'Paste') {
                if (diagram.ej2_instances[0].commandHandler.clipboardData.pasteIndex !== undefined
                    && diagram.ej2_instances[0].commandHandler.clipboardData.clipObject !== undefined) {
                    hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);

                }
            }
            if (args.items[i].text === 'Select All') {
                if ((diagram.ej2_instances[0].nodes.length || diagram.ej2_instances[0].connectors.length)) {
                    hiddenId.splice(hiddenId.indexOf(args.items[i].id), 1);
                }
            }
            var canAllow = false;
            if (diagram.ej2_instances[0].selectedItems.nodes.length && diagram.ej2_instances[0].selectedItems.nodes[0].shape.shape !== 'TextAnnotation') {
                if (diagram.ej2_instances[0].selectedItems.nodes[0].children === undefined) {
                    canAllow = true;
                }
                else {
                    var item = args.items[i];
                    if (item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete') {
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                    }
                }
            }
            if (diagram.ej2_instances[0].selectedItems.connectors.length && !(diagram.ej2_instances[0].selectedItems.connectors[0].targetID.includes('newAnnotation'))) {
                canAllow = true;
            }
            var selectedObjects = diagram.ej2_instances[0].selectedItems.nodes.concat(diagram.ej2_instances[0].selectedItems.connectors);
            if ((diagram.ej2_instances[0].selectedItems.nodes.length || diagram.ej2_instances[0].selectedItems.connectors.length) && canAllow && selectedObjects.length === 1) {

                var item = args.items[i];
                if (diagram.ej2_instances[0].selectedItems.nodes.length < 1 && diagram.ej2_instances[0].selectedItems.connectors.length) {
                    if (diagram.ej2_instances[0].selectedItems.connectors[0].shape && diagram.ej2_instances[0].selectedItems.connectors[0].shape.type === 'Bpmn') {
                        if (item.text === 'Association' && diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow === 'Association') {
                            hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                            hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                            hiddenId.splice(hiddenId.indexOf('Association'), 1);
                            hiddenId.splice(hiddenId.indexOf('Direction'), 1);
                        }
                        else if (item.text === 'Sequence' && diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow === 'Sequence') {
                            hiddenId.splice(hiddenId.indexOf('Association'), 1);
                            hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                            hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                            hiddenId.splice(hiddenId.indexOf('Condition type'), 1);
                        }
                        else if (item.text === 'Message Flow' && diagram.ej2_instances[0].selectedItems.connectors[0].shape.flow === 'Message') {
                            hiddenId.splice(hiddenId.indexOf('Association'), 1);
                            hiddenId.splice(hiddenId.indexOf('Sequence'), 1);
                            hiddenId.splice(hiddenId.indexOf('MessageFlow'), 1);
                            hiddenId.splice(hiddenId.indexOf('MessageType'), 1);
                        }
                    }
                }

                if (item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete') {
                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }

                if (diagram.ej2_instances[0].selectedItems.nodes.length) {
                    var bpmnShape = diagram.ej2_instances[0].selectedItems.nodes[0].shape;
                    if (bpmnShape.type !== 'Text') {
                        if (bpmnShape.shape !== 'DataObject' && bpmnShape.shape !== 'Gateway') {
                            if (item.text === 'Ad-Hoc') {
                                if (bpmnShape.activity.activity === 'SubProcess') {
                                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                                }
                            }
                            if (item.text === 'Loop' || item.text === 'Compensation') {
                                if (bpmnShape.shape === 'Activity') {
                                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                                }
                            }
                            if (item.text === 'Activity-Type') {
                                if (bpmnShape.shape === 'Activity' && (bpmnShape.activity.activity === 'Task' || (bpmnShape.activity.activity === 'SubProcess' && bpmnShape.activity.subProcess.collapsed))) {
                                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                                }
                            }
                            if (item.text === 'Boundary') {
                                if ((bpmnShape.activity.activity === 'SubProcess')) {
                                    hiddenId.splice(hiddenId.indexOf(item.id), 1);
                                }
                            }
                        }
                        if (item.text === 'Add Text Annotation') {
                            if (diagram.ej2_instances[0].selectedItems.nodes.length && diagram.ej2_instances[0].selectedItems.nodes[0].shape.shape !== 'Message' && diagram.ej2_instances[0].selectedItems.nodes[0].shape.shape !== 'DataSource') {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Data Object') {
                            if ((bpmnShape.shape === 'DataObject')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Collection') {
                            if ((bpmnShape.shape === 'DataObject')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Task Call') {
                            if ((bpmnShape.shape === 'Activity') &&
                                (bpmnShape.activity.activity === 'Task')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Trigger Result') {
                            if ((bpmnShape.shape === 'Event')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Event Type') {
                            if ((bpmnShape.shape === 'Event')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'Task Type') {
                            if ((bpmnShape.shape === 'Activity') &&
                                (bpmnShape.activity.activity === 'Task')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                        if (item.text === 'GateWay') {
                            if ((bpmnShape.shape === 'Gateway')) {
                                hiddenId.splice(hiddenId.indexOf(item.id), 1);
                            }
                        }
                    }
                }
            }
            else if (selectedObjects.length > 1) {
                let item = args.items[i];
                if (item.text === 'Cut' || item.text === 'Copy' || item.text === 'Delete') {
                    if (hiddenId.indexOf(item.id) > -1)
                        hiddenId.splice(hiddenId.indexOf(item.id), 1);
                }
            }
        }
        this.updateContextMenuSelection(true, args);
        args.hiddenItems = hiddenId;
        diagram.ej2_instances[0].dataBind();
    };
    multipleSelectionSettings(selectedItems) {
        this.objectTypeChange('None');
        var showConnectorPanel = false, showNodePanel = false;
        var showTextPanel = false, showConTextPanel = false;
        var nodeContainer = document.getElementById('nodePropertyContainer');
        for (var i = 0; i < selectedItems.length; i++) {
            var object = selectedItems[i];
            if (object instanceof ej.diagrams.Node && (!showNodePanel || !showTextPanel)) {
                showNodePanel = true;
                showTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
            else if (object instanceof ej.diagrams.Connector && (!showConnectorPanel || !showConTextPanel)) {
                showConnectorPanel = true;
                showConTextPanel = object.annotations.length > 0 && object.annotations[0].content ? true : false;
            }
        }
        var selectItem1 = diagram.ej2_instances[0].selectedItems;
        if (showNodePanel) {
            nodeContainer.style.display = '';
            nodeContainer.classList.add('multiple');
            if (showConnectorPanel) {
                nodeContainer.classList.add('connector');
            }
            this.bindNodeProperties(selectItem1.nodes[0]);
        }
        if (showConnectorPanel && !showNodePanel) {
            document.getElementById('connectorPropertyContainer').style.display = '';
            this.bindConnectorProperties(selectItem1.connectors[0]);
        }
        if (showTextPanel || showConTextPanel) {
            document.getElementById('textPropertyContainer').style.display = '';
            if (showTextPanel && showConTextPanel) {
                document.getElementById('textPositionDiv').style.display = 'none';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            }
            else {
                document.getElementById('textPositionDiv').style.display = '';
                document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
                if (showConTextPanel) {
                    ddlTextPosition.dataSource = TextProperties.prototype.getConnectorTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                else {
                    ddlTextPosition.dataSource = TextProperties.prototype.getNodeTextPositions();
                    //selectedItem.utilityMethods.bindTextProperties(selectItem1.connectors[0].annotations[0].style, selectedItem);
                }
                ddlTextPosition.ej2_instances[0].dataBind();
            }
        }
    }
    singleSelectionSettings(selectedObject) {
        var object = null;
        if (selectedObject instanceof ej.diagrams.Node) {
            this.objectTypeChange('node');
            object = selectedObject;
            this.bindNodeProperties(object);
        }
        else if (selectedObject instanceof ej.diagrams.Connector) {
            this.objectTypeChange('connector');
            object = selectedObject;
            this.bindConnectorProperties(object);
        }
        if (object.shape && object.shape.type === 'Text') {
            document.getElementById('textPropertyContainer').style.display = '';
            document.getElementById('toolbarTextAlignmentDiv').style.display = 'none';
            document.getElementById('textPositionDiv').style.display = 'none';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-left';
            this.bindTextProperties(object.style);
        }
        else if (object.annotations.length > 0 && object.annotations[0].content) {
            document.getElementById('textPropertyContainer').style.display = '';
            var annotation = null;
            document.getElementById('toolbarTextAlignmentDiv').style.display = '';
            document.getElementById('textPositionDiv').style.display = '';
            document.getElementById('textColorDiv').className = 'col-xs-6 db-col-right';
            this.bindTextProperties(object.annotations[0].style);
            UtilityMethods.prototype.updateHorVertAlign(object.annotations[0].horizontalAlignment, object.annotations[0].verticalAlignment);
            if (object.annotations[0] instanceof ej.diagrams.ShapeAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = TextProperties.prototype.getNodeTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.ej2_instances[0].dataBind();
                ddlTextPosition.value = textProperties.textPosition = UtilityMethods.prototype.getPosition(annotation.offset);
                ddlTextPosition.ej2_instances[0].dataBind();
            }
            else if (object.annotations[0] instanceof ej.diagrams.PathAnnotation) {
                annotation = object.annotations[0];
                ddlTextPosition.dataSource = TextProperties.prototype.getConnectorTextPositions();
                ddlTextPosition.value = textProperties.textPosition = null;
                ddlTextPosition.ej2_instances[0].dataBind();
                ddlTextPosition.value = textProperties.textPosition = annotation.alignment;
                ddlTextPosition.ej2_instances[0].dataBind();
            }
        }
    }
    objectTypeChange(objectType) {
        document.getElementById('diagramPropertyContainer').style.display = 'none';
        document.getElementById('nodePropertyContainer').style.display = 'none';
        document.getElementById('textPropertyContainer').style.display = 'none';
        document.getElementById('connectorPropertyContainer').style.display = 'none';
        switch (objectType) {
            case 'diagram':
                document.getElementById('diagramPropertyContainer').style.display = '';
                break;
            case 'node':
                document.getElementById('nodePropertyContainer').style.display = '';
                break;
            case 'connector':
                document.getElementById('connectorPropertyContainer').style.display = '';
                break;
        }
    }
    bindNodeProperties(node) {
        nodeProperties.offsetX.value = node.offsetX;
        nodeProperties.offsetY.value = node.offsetY;
        nodeProperties.width.value = node.width;
        nodeProperties.height.value = node.height;
        nodeProperties.rotateAngle.value = node.rotateAngle;
        nodeProperties.rotateAngle.value = node.rotateAngle;
        nodeProperties.fillColor.value = UtilityMethods.prototype.getHexColor(node.style.fill);
        nodeProperties.strokeColor.value = UtilityMethods.prototype.getHexColor(node.style.strokeColor);
        nodeProperties.strokeWidth.value = node.style.strokeWidth;
        nodeProperties.strokeStyle.value = node.style.strokeDashArray ? node.style.strokeDashArray : '';
        nodeProperties.opacity = node.style.opacity * 100;
        nodeProperties.aspectRatio.cssClass = node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? document.getElementById('aspectRatioBtn').classList.add('e-active') : document.getElementById('aspectRatioBtn').classList.remove('e-active');
        node.constraints & ej.diagrams.NodeConstraints.AspectRatio ? aspectRatioBtn.ej2_instances[0].iconCss = 'sf-icon-lock': aspectRatioBtn.ej2_instances[0].iconCss = 'sf-icon-unlock';
        nodeProperties.gradient.value = node.style.gradient.type !== 'None' ? 'Gradient' : 'Solid';
            var gradientElement = document.getElementById('gradientStyle');
                if (nodeProperties.gradient.value === 'Gradient') {
                    gradientElement.className = 'row db-prop-row db-gradient-style-show';
                    nodeProperties.gradientColor.value = node.style.gradient.stops[1].color;
                    var gradient = node.style.gradient;
                    if (gradient.x1) {
                        nodeProperties.gradientDirection.value = 'North';
                    }
                    else if (gradient.x2) {
                        nodeProperties.gradientDirection.value = 'East';
                    }
                    else if (gradient.y1) {
                        nodeProperties.gradientDirection.value = 'West';
                    }
                    else if (gradient.y2) {
                        nodeProperties.gradientDirection.value = 'South';
                    }
                }
                else {
                    gradientElement.className = 'row db-prop-row db-gradient-style-hide';
                    nodeProperties.gradientColor.value = '#ffffff';
                    nodeProperties.gradientDirection.value = 'South';
                }
    }

    bindConnectorProperties(connector) {
        connectorProperties.lineType.value = connector.type;
        connectorProperties.lineColor.value = UtilityMethods.prototype.getHexColor(connector.style.strokeColor);
        connectorProperties.lineStyle = connector.style.strokeDashArray ? connector.style.strokeDashArray : '';
        connectorProperties.lineWidth = connector.style.strokeWidth;
        connectorProperties.sourceType = connector.sourceDecorator.shape;
        connectorProperties.sourceSize = connector.sourceDecorator.width;
        connectorProperties.targetType = connector.targetDecorator.shape;
        connectorProperties.targetSize = connector.targetDecorator.width;
        connectorProperties.opacity = connector.style.opacity * 100;
        connectorProperties.lineJumpSize.value = connector.bridgeSpace;
        connectorProperties.lineJump.checked = connector.constraints & ej.diagrams.ConnectorConstraints.Bridging ? true : false;
    };
    bindTextProperties(text) {
        textProperties.fontColor.value = UtilityMethods.prototype.getHexColor(text.color);
        textProperties.fontFamily = text.fontFamily;
        textProperties.fontSize = text.fontSize;
        textProperties.opacity = text.opacity * 100;
        var toolbarTextStyle = document.getElementById('toolbarTextStyle');
        if (toolbarTextStyle) {
            toolbarTextStyle = toolbarTextStyle.ej2_instances[0];
        }
        if (toolbarTextStyle) {
            toolbarTextStyle.items[0].cssClass = text.bold ? 'tb-item-start tb-item-selected' : 'tb-item-start';
            toolbarTextStyle.items[1].cssClass = text.italic ? 'tb-item-middle tb-item-selected' : 'tb-item-middle';
            toolbarTextStyle.items[2].cssClass = text.textDecoration === 'Underline' ? 'tb-item-end tb-item-selected' : 'tb-item-end';
        }
        UtilityMethods.prototype.updateTextAlign(text.textAlign);
    }
    addTick(args, index, checked, tickIndex) {
        let i = tickIndex;
        if (checked) {
            if (args.items[index].items[i].iconCss.indexOf('sf-icon-check-tick') === -1) {
                args.items[index].items[i].iconCss += ' sf-icon-check-tick';
            }
        }
        else {
            if (args.items[index].items[i].iconCss.indexOf('sf-icon-check-tick') !== -1) {
                args.items[index].items[i].iconCss = args.items[index].items[i].iconCss.replace(' sf-icon-check-tick', '');
            }
        }
    }
}
module.exports = DiagramClientSideEvents;