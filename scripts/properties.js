var UtilityMethods = require("./utilitymethods.js")
const {
  NodeProperties,
  ConnectorProperties,
  TextProperties,
} = require('./common');

var nodeProperties = new NodeProperties();
var textProperties = new TextProperties();
var connectorProperties =  new ConnectorProperties();
class PropertyChange  {
    constructor() {}
    nodePropertyChange(args)
    {
           if (!diagram.preventPropertyChange) {
               if (diagram) {
                   if (diagram.ej2_instances[0].selectedItems.nodes.length > 0) {
                       var selectedNodes = diagram.ej2_instances[0].selectedItems.nodes;
                       for (var i = 0; i < selectedNodes.length; i++) {
                           var node = selectedNodes[i];
                           var propertyName1 = args.propertyName.toString().toLowerCase();
                           switch (propertyName1) {
                               case 'offsetx':
                                   node.offsetX = args.propertyValue.value;
                                   nodeOffsetX.value = args.propertyValue.value;
                                   break;
                               case 'offsety':
                                   node.offsetY = args.propertyValue.value;
                                   break;
                               case 'width':
                                   node.width = args.propertyValue.value;
                                   break;
                               case 'height':
                                   node.height = args.propertyValue.value;
                                   break;
                               case 'rotateangle':
                                   node.rotateAngle = args.propertyValue.value;
                                   break;
                               case 'aspectratio':
                                   node.constraints = node.constraints ^ ej.diagrams.NodeConstraints.AspectRatio;
                                   break;
                           }
                           if (!node.children) {
                                UtilityMethods.prototype.applyNodeStyle(propertyName1, node, args.propertyValue);
                           }
                           else {
                               for (var j = 0; j < node.children.length; j++) {
                                UtilityMethods.prototype.applyNodeStyle(propertyName1, diagram.getObject(node.children[j]), args.propertyValue);
                               }
                           }
                       }
                       this.isModified = true;
                   }
                   if (diagram.ej2_instances[0].selectedItems.connectors.length > 0) {
                       const selectedNodes = diagram.ej2_instances[0].selectedItems.connectors;
                       for (var i = 0; i < selectedNodes.length; i++) {
                        var connector = selectedNodes[i];
                           switch (args.propertyName.toString().toLowerCase()) {
                               case 'strokecolor':
                                   connector.style.strokeColor = UtilityMethods.prototype.getColor(args.propertyValue.value);
                                   connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                                   connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                                   break;
                               case 'strokewidth':
                                   connector.style.strokeWidth = args.propertyValue.value;
                                   if (connector.sourceDecorator.style) {
                                       connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                                   }
                                   else {
                                       connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                                   }
                                   if (connector.targetDecorator.style) {
                                       connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                                   }
                                   else {
                                       connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                                   }
                                   break;
                               case 'strokestyle':
                                   connector.style.strokeDashArray = args.propertyValue.value;
                                   break;
                               case 'opacity':
                                   connector.style.opacity = args.propertyValue.value / 100;
                                   connector.targetDecorator.style.opacity = connector.style.opacity;
                                   connector.sourceDecorator.style.opacity = connector.style.opacity;
                                   document.getElementById("connectorOpacitySliderText").value = args.propertyValue.value + '%';
                                   break;
                           }
                       }
                       this.isModified = true;
                   }
                   diagram.ej2_instances[0].selectedItems.dataBind();
               }
       }
    };
    connectorPropertyChange(args)
    {
            if (!diagram.preventPropertyChange) {
                if (diagram && diagram.ej2_instances[0].selectedItems.connectors.length > 0) {
                    var selectedNodes = diagram.ej2_instances[0].selectedItems.connectors;
                    for (var i = 0; i < selectedNodes.length; i++) {
                        var connector = selectedNodes[i];
                        switch (args.propertyName.toString().toLowerCase()) {
                            case 'linecolor':
                                connector.style.strokeColor = UtilityMethods.prototype.getColor(args.propertyValue.value);
                                connector.sourceDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                                connector.targetDecorator.style = { fill: connector.style.strokeColor, strokeColor: connector.style.strokeColor };
                                break;
                            case 'linewidth':
                                connector.style.strokeWidth = args.propertyValue.value;
                                if (connector.sourceDecorator.style) {
                                    connector.sourceDecorator.style.strokeWidth = connector.style.strokeWidth;
                                }
                                else {
                                    connector.sourceDecorator.style = { strokeWidth: connector.style.strokeWidth };
                                }
                                if (connector.targetDecorator.style) {
                                    connector.targetDecorator.style.strokeWidth = connector.style.strokeWidth;
                                }
                                else {
                                    connector.targetDecorator.style = { strokeWidth: connector.style.strokeWidth };
                                }
                                break;
                            case 'linestyle':
                                connector.style.strokeDashArray = args.propertyValue.value;
                                break;
                            case 'linetype':
                                connector.type = args.propertyValue.value;
                                break;
                            case 'sourcetype':
                                connector.sourceDecorator.shape = args.propertyValue.value;
                                break;
                            case 'targettype':
                                connector.targetDecorator.shape = args.propertyValue.value;
                                break;
                            case 'sourcesize':
                                connector.sourceDecorator.width = connector.sourceDecorator.height = args.propertyValue.value;
                                break;
                            case 'targetsize':
                                connector.targetDecorator.width = connector.targetDecorator.height = args.propertyValue.value;
                                break;
                            case 'opacity':
                                connector.style.opacity = args.propertyValue.value / 100;
                                connector.targetDecorator.style.opacity = connector.style.opacity;
                                connector.sourceDecorator.style.opacity = connector.style.opacity;
                                document.getElementById("connectorOpacitySliderText").value = args.propertyValue.value + '%';
                                break;
                            case 'linejump':
                                if (args.propertyValue.checked) {
                                    connector.constraints = connector.constraints | ej.diagrams.ConnectorConstraints.Bridging;
                                }
                                else {
                                    connector.constraints = connector.constraints & ~ej.diagrams.ConnectorConstraints.Bridging;
                                }
                                break;
                            case 'linejumpsize':
                                connector.bridgeSpace = args.propertyValue.value;
                                break;
                        }
                    }
                    diagram.ej2_instances[0].dataBind();
                    this.isModified = true;
                }
            }
    };
    textPropertyChange(args)
    {
            if (!diagram.preventPropertyChange) {
                if (diagram) {
                    var selectedObjects = diagram.ej2_instances[0].selectedItems.nodes;
                    selectedObjects = selectedObjects.concat(diagram.ej2_instances[0].selectedItems.connectors);
                    var propertyName = args.propertyName.toString().toLowerCase();
                    if (selectedObjects.length > 0) {
                        for (var i = 0; i < selectedObjects.length; i++) {
                            var node = selectedObjects[i];
                            if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                                if (node.annotations.length > 0) {
                                    for (var j = 0; j < node.annotations.length; j++) {
                                        var annotation = node.annotations[j].style;
                                        UtilityMethods.prototype.updateTextFontProperties(propertyName, annotation, args);
                                    }
                                }
                                else if (node.shape && node.shape.type === 'Text') {
                                    UtilityMethods.prototype.updateTextFontProperties(propertyName, node.style, args);
                                }
                               
                            }
                        }
                        diagram.ej2_instances[0].dataBind();
                        this.isModified = true;
                    }
                }
            }
    };
    textPropertiesChange(propertyName,propertyValue)
    {
        if (!diagram.preventPropertyChange) {
            var selectedObjects = diagram.ej2_instances[0].selectedItems.nodes;
            selectedObjects = selectedObjects.concat(diagram.ej2_instances[0].selectedItems.connectors);
            propertyName = propertyName.toLowerCase();
            if (selectedObjects.length > 0) {
                for (var i = 0; i < selectedObjects.length; i++) {
                    var node = selectedObjects[i];
                    if (node instanceof ej.diagrams.Node || node instanceof ej.diagrams.Connector) {
                        if (node.annotations.length > 0) {
                            for (var j = 0; j < node.annotations.length; j++) {
                                var annotation = null;
                                if (node.annotations[j] instanceof ej.diagrams.ShapeAnnotation) {
                                    annotation = node.annotations[j];
                                    if (propertyName === 'textposition') {
                                        textProperties.textPosition = propertyValue.toString();
                                        annotation.offset = UtilityMethods.prototype.getOffset(propertyValue);
                                    }
                                }
                                else if (node.annotations[j] instanceof ej.diagrams.PathAnnotation) {
                                    annotation = node.annotations[j];
                                    if (propertyName === 'textposition') {
                                        textProperties.textPosition = propertyValue.toString();
                                        annotation.alignment = textProperties.textPosition;
                                    }
                                }
                                if (propertyName === 'left' || propertyName === 'right' || propertyName === 'center') {
                                    annotation.horizontalAlignment = propertyValue;
                                    UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'top' || propertyName === 'bottom') {
                                    annotation.verticalAlignment = propertyValue;
                                    UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else if (propertyName === 'middle') {
                                    annotation.verticalAlignment = 'Center';
                                    UtilityMethods.prototype.updateHorVertAlign(annotation.horizontalAlignment, annotation.verticalAlignment);
                                }
                                else {
                                    UtilityMethods.prototype.updateTextProperties(propertyName, propertyValue, annotation.style);
                                }
                            }
                        }
                        else if (node.shape && node.shape.type === 'Text') {
                            UtilityMethods.prototype.updateTextProperties(propertyName, propertyValue, node.style);
                        }
                    }
                }
                diagram.ej2_instances[0].dataBind();
            }
        }
    }
    aspectRatioClick(args) {
        var isAspect = true;
        if (document.getElementById('aspectRatioBtn').classList.contains('e-active')) {
            isAspect = true;
            aspectRatioBtn.ej2_instances[0].iconCss = 'sf-icon-lock'
        } else {
            isAspect = false;
            aspectRatioBtn.ej2_instances[0].iconCss = 'sf-icon-unlock';
        }
      this.nodePropertyChange({ propertyName: 'aspectRatio', propertyValue: isAspect });
    }
}
module.exports = PropertyChange;   