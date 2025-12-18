ej.diagrams.Diagram.Inject(ej.diagrams.BpmnDiagrams, ej.diagrams.UndoRedo, ej.diagrams.DiagramContextMenu);
ej.diagrams.SymbolPalette.Inject(ej.diagrams.BpmnDiagrams);
var conTypeBtn;
var orderBtn;
var hidePropertyBtn;
const DiagramClientSideEvents = require('./events.js');
const UtilityMethods = require('./utilitymethods.js');
const DropDownDataSources = require('./dropdowndatasource.js');
const PropertyChange = require('./properties.js')
var diagramEvents = new DiagramClientSideEvents();
const dataSourceInstance = new DropDownDataSources();
const {
    ConnectorProperties,
    TextProperties,
    ExportSettings,
  } = require('./common.js');
  const nodeProperties = require('./common.js');
  const connectorProperties = require('./common.js');
  const textProperties = require('./common.js');
  var exportSettings = new ExportSettings();
  window.onload = function()
{
    document.onmouseover = menumouseover.bind(this);
   
    zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
}

function renameDiagram(args) {
    document.getElementsByClassName('db-diagram-name-container')[0].classList.add('db-edit-name');
    var element = document.getElementById('diagramEditable');
    element.value = document.getElementById('diagramName').innerHTML;
    element.focus();
    element.select();
}
// window.onload = function(){
//     zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
// }
var nodes = [
    {
        id: 'Start1', offsetX:100, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id: 'Task1', width: 120, height: 75, offsetX: 250, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Receive Book lending Request'}]
    },
    {
        id: 'Task2', width: 120, height: 75, offsetX: 420, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Service'}
            },
        },
        annotations:[{content:'Get the Book Status',offset:{x:0.5,y:0.5},verticalAlignment:'Top'}]
    },
    {
        id: 'Gateway1', width: 70, height: 60, offsetX: 570, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway',  },
    },
    {
        id: 'Task3', width: 120, height: 75, offsetX: 780, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Send'}
            },
        },
        annotations:[{content:'On loan Reply'}]
    },
    {
        id: 'Gateway2', width: 70, height: 60, offsetX: 920, offsetY: 300,
        shape: { type: 'Bpmn', shape: 'Gateway', gateway: { type: 'EventBased' } },
    },
    {
        id: 'Intermediate1', offsetX:1050, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Decline Hold',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Task4', width: 120, height: 75, offsetX: 1200, offsetY: 300,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Cancel Request'}]
    },
    {
        id: 'End1', offsetX:1400, offsetY: 300 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End',},
        },
    },
    {
        id: 'Intermediate2', offsetX:1050, offsetY: 200 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Hold Book',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Intermediate3', offsetX:1050, offsetY: 400 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'One Week',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Intermediate4', offsetX:900, offsetY: 60 , width: 50, height: 50, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate',trigger:'Message'},
        },
        annotations:[{content:'Two Weeks',offset:{x:0.5,y:1.0},verticalAlignment:'Top'}]
    },
    {
        id: 'Task5', width: 120, height: 75, offsetX: 780, offsetY: 550,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'User'}
            },
        },
        annotations:[{content:'Checkout the Book'}]
    },
    {
        id: 'Task6', width: 120, height: 75, offsetX: 1050, offsetY: 550,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Checkout Reply'}]
    },
    {
        id: 'Task7', width: 120, height: 75, offsetX: 1200, offsetY: 200,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Service'}
            },
        },
        annotations:[{content:'Request Hold'}]
    },
    {
        id: 'Task8', width: 120, height: 75, offsetX: 1390, offsetY: 200,
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',task: {type:'Receive'}
            },
        },
        annotations:[{content:'Hold Reply'}]
    },
];

//Initialize bpmn shapes for symbol palette
var bpmnShapes = [
    {
        id: 'Task', width: 35, height: 30, 
        shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'Task',
            },
        },
    },
    {
        id: 'Gateway', width: 30, height: 30, 
        shape: { type: 'Bpmn', shape: 'Gateway',}
    },
    {
        id: 'Intermediate_Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Intermediate' }
        },
    },
    {
        id: 'End_Event', width: 30, height: 30,  shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'End' }
        },
    },
    {
        id: 'Start_Event', width: 30, height: 30, shape: {
            type: 'Bpmn', shape: 'Event',
            event: { event: 'Start' }
        },
    },
    {
        id:'Collapsed_Sub-process', width:35,height:30,shape: {
            type: 'Bpmn', shape: 'Activity', activity: {
                activity: 'SubProcess', subProcess: { collapsed: true, boundary: 'Default' }
            },
        },
    },
     {
        id: 'Expanded_Sub-Process', width: 35, height: 30, 
        constraints: ej.diagrams.NodeConstraints.Default | ej.diagrams.NodeConstraints.AllowDrop,
        shape: {
            shape: 'Activity', type: 'Bpmn',
            activity: {
                activity: 'SubProcess', subProcess: {
                    type: 'Transaction', collapsed: false,
                    processes: [], transaction: {
                        cancel: { visible: false }, failure: { visible: false }, success: { visible: false }
                    }
                }
            }
        },
    },
    {
        id:'Sequence_Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 30 },
        type: 'Straight',targetDecorator:{shape:'Arrow',style:{fill:'black'}},
        shape: { type: 'Bpmn', flow: 'Sequence',sequence: 'Normal'
        },
    },
    {
        id:'Association_Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 35 },
        type: 'Straight',style:{strokeDashArray:"2 2"},
        targetDecorator:{shape:'None'},sourceDecorator:{shape:'None'},
        shape: { type: 'Bpmn', flow: 'Association',association:'Default'}, 
    },
    {
        id:'Message_Flow',
        sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 30, y: 22 },type: 'Straight',
        sourceDecorator:{shape:'None'},targetDecorator:{shape:'Arrow',style:{fill:'white'}},
        style:{strokeDashArray:'4 4'}
    },
    {
        id: 'Message', width: 35,
        height: 26,shape: { type: 'Bpmn', shape: 'Message',},
      },
        {
        id:'Data_Source', width:30,height:28, shape: {
            type: 'Bpmn', shape: 'DataSource',  
        }
    },
    {
        id: 'Data_Object', width: 30, height: 35, 
        shape: { type: 'Bpmn', shape: 'DataObject', dataObject: { collection: false, type: 'None' } },
    },

   
];

// Initialize connectors for diagram
var connectors = [
    {
        id:'connector1',sourceID:'Start1',targetID:'Task1',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector2',sourceID:'Task1',targetID:'Task2',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector3',sourceID:'Task2',targetID:'Gateway1',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector4',sourceID:'Gateway1',targetID:'Task3',annotations:[{content:'Book is on Loan'}],type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector5',sourceID:'Task3',targetID:'Gateway2',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector6',sourceID:'Gateway2',targetID:'Intermediate1',sourcePortID:'right',targetPortID:'left',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector7',sourceID:'Intermediate1',targetID:'Task4',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector8',sourceID:'Task4',targetID:'End1',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector9',sourceID:'Gateway2',targetID:'Intermediate2',sourcePortID:'top',targetPortID:'left',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector10',sourceID:'Gateway2',targetID:'Intermediate3',sourcePortID:'bottom',targetPortID:'left',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector11',sourceID:'Intermediate2',targetID:'Task7',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector12',sourceID:'Intermediate3',targetID:'Task4',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector13',sourceID:'Task7',targetID:'Task8',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector14',sourceID:'Task8',targetID:'Intermediate4',sourcePortID:'top',targetPortID:'right',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector15',sourceID:'Intermediate4',targetID:'Task2',sourcePortID:'left',targetPortID:'top',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector16',sourceID:'Gateway1',targetID:'Task5',sourcePortID:'bottom',targetPortID:'left',
        annotations:[{content:'Book is Avaliable'}],type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector17',sourceID:'Task5',targetID:'Task6',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
    {
        id:'connector18',sourceID:'Task6',targetID:'End1',sourcePortID:'right',targetPortID:'bottom',type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}
    },
]
//...
//Context menu items
var contextMenu = {
    show: true, items: [
        {
            text: 'Copy', id: 'Copy', target: '.e-diagramcontent', iconCss: 'sf-icon-copy'
        },
        {
            text: 'Cut', id: 'Cut', target: '.e-diagramcontent', iconCss: 'sf-icon-cut'
        },
        {
            text: 'Paste', id: 'Paste', target: '.e-diagramcontent', iconCss: 'sf-icon-paste'
        },
        {
            text: 'Delete', id: 'Delete', target: '.e-diagramcontent', iconCss: 'sf-icon-delete'
        },
        {
            text: 'Select All', id: 'SelectAll', target: '.e-diagramcontent', iconCss: 'e-menu-icon'
        },
        {
            text: 'Association', id: 'Association',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Sequence', id: 'Sequence',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Message Flow', id: 'MessageFlow',iconCss:'e-bpmn-icons' 
        },
        {
            text: 'Condition type', id: 'Condition type', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Conditional', id: 'Conditional Flow',iconCss:'e-bpmn-icons'},
                    {text: 'Normal', id: 'Normal Flow',iconCss:'e-bpmn-icons'},
            ]
        },
        {
            text: 'Direction', id: 'Direction', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Directional', id: 'Directional',iconCss:'e-bpmn-icons'},
                    {text: 'Bi-Directional', id: 'BiDirectional',iconCss:'e-bpmn-icons'},
            ]
        },
        {
            text: 'Ad-Hoc', id: 'Adhoc',
            iconCss: 'e-adhocs e-bpmn-icons e-adhoc',
        }, {
            text: 'Loop', id: 'Loop',
            items: [{ text: 'None', iconCss: 'e-loop e-bpmn-icons e-None', id: 'LoopNone' },
            { text: 'Standard', iconCss: 'e-loop e-bpmn-icons e-Loop', id: 'Standard' },
            { text: 'Parallel Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-ParallelMI', id: 'ParallelMultiInstance' },
            { text: 'Sequence Multi-Instance', iconCss: 'e-loop e-bpmn-icons e-SequentialMI', id: 'SequenceMultiInstance' }]
        }, {
            text: 'Compensation', id: 'taskCompensation',
            iconCss: 'e-compensation e-bpmn-icons e-Compensation',
        }, {
            text: 'Activity-Type', id: 'Activity-Type',
            items: [{ iconCss: 'e-bpmn-icons e-Task', text: 'Task', id: 'Task' }
                ,{ text: 'Collapsed sub-process', iconCss: 'e-bpmn-icons e-SubProcess', id: 'SubProcess' },
            ]
        }, {
            text: 'Boundary', id: 'Boundary',
            items: [{ text: 'Default', iconCss: 'e-boundry e-bpmn-icons e-Default', id: 'Default' },
            { text: 'Call', iconCss: 'e-boundry e-bpmn-icons e-Call', id: 'BoundryCall' },
            { text: 'Event', iconCss: 'e-boundry e-bpmn-icons e-Event', id: 'BoundryEvent' },]
        }, {
            text: 'Data Object', id: 'DataObject',
            items: [{ text: 'None', iconCss: 'e-data e-bpmn-icons e-None', id: 'DataObjectNone' },
            { text: 'Input', iconCss: 'e-data e-bpmn-icons e-DataInput', id: 'Input' },
            { text: 'Output', iconCss: 'e-data e-bpmn-icons e-DataOutput', id: 'Output' }]
        }, {
            text: 'Collection', id: 'collection',
            iconCss: 'e-collection e-bpmn-icons e-ParallelMI',
        }, {
            text: 'Task Call', id: 'DeftCall', 
            iconCss: 'e-call e-bpmn-icons e-CallActivity', 
        }, {
            text: 'Trigger Result', id: 'TriggerResult',
            items: [{ text: 'None', id: 'TriggerNone', iconCss: 'e-trigger e-bpmn-icons e-None' },
            { text: 'Message', id: 'Message', iconCss: 'e-trigger e-bpmn-icons e-InMessage' },
            { text: 'Multiple', id: 'Multiple', iconCss: 'e-trigger e-bpmn-icons e-InMultiple' },
            { text: 'Parallel', id: 'Parallel', iconCss: 'e-trigger e-bpmn-icons e-InParallelMultiple' },
            { text: 'Signal', id: 'Signal', iconCss: 'e-trigger e-bpmn-icons e-InSignal' },
            { text: 'Timer', id: 'Timer', iconCss: 'e-trigger e-bpmn-icons e-InTimer' },
            { text: 'Cancel', id: 'Cancel', iconCss: 'e-trigger e-bpmn-icons e-CancelEnd' },
            { text: 'Escalation', id: 'Escalation', iconCss: 'e-trigger e-bpmn-icons e-InEscalation' },
            { text: 'Error', id: 'Error', iconCss: 'e-trigger e-bpmn-icons e-InError' },
            { text: 'Compensation', id: 'triggerCompensation', iconCss: 'e-trigger e-bpmn-icons e-InCompensation' },
            { text: 'Terminate', id: 'Terminate', iconCss: 'e-trigger e-bpmn-icons e-TerminateEnd' },
            { text: 'Conditional', id: 'Conditional', iconCss: 'e-trigger e-bpmn-icons e-InConditional' },
            { text: 'Link', id: 'Link', iconCss: 'e-trigger e-bpmn-icons e-ThrowLinkin' }
            ]
        },
        {
            text: 'Event Type', id: 'EventType',
            items: [{ text: 'Start', id: 'Start', iconCss: 'e-event e-bpmn-icons e-NoneStart', },
            { text: 'Intermediate', id: 'Intermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            { text: 'Non-Interrupting Start', id: 'NonInterruptingStart', iconCss: 'e-event e-bpmn-icons e-Noninterruptingstart' },
            { text: 'Throwing Intermediate', id: 'ThrowingIntermediate', iconCss: 'e-event e-bpmn-icons e-InterruptingNone' },
            {
                text: 'Non-Interrupting Intermediate', id: 'NonInterruptingIntermediate',
                iconCss: 'e-event e-bpmn-icons e-NoninterruptingIntermediate'
            },
            { text: 'End', id: 'End', iconCss: 'e-event e-bpmn-icons e-NoneEnd' }]
        }, {
            text: 'Task Type', id: 'TaskType',
            items: [
                { text: 'None', id: 'TaskNone', iconCss: 'e-task e-bpmn-icons e-None' },
                { text: 'Service', id: 'Service', iconCss: 'e-task e-bpmn-icons e-ServiceTask' },
                { text: 'Business Rule', id: 'BusinessRule', iconCss: 'e-task e-bpmn-icons e-BusinessRule' },
                { text: 'Instantiating Receive', id: 'InstantiatingReceive', iconCss: 'e-task e-bpmn-icons e-InstantiatingReceive' },
                { text: 'Manual', id: 'Manual', iconCss: 'e-task e-bpmn-icons e-ManualCall' },
                { text: 'Receive', id: 'Receive', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'Script', id: 'Script', iconCss: 'e-task e-bpmn-icons e-ScriptCall' },
                { text: 'Send', id: 'Send', iconCss: 'e-task e-bpmn-icons e-InMessage' },
                { text: 'User', id: 'User', iconCss: 'e-task e-bpmn-icons e-UserCall' },
            ]
        }, {
            text: 'GateWay', id: 'GateWay',
            iconCss: 'e-bpmn-icons e-Gateway', items: [
                { text: 'None', id: 'GatewayNone', iconCss: 'e-gate e-bpmn-icons e-None sf-icon-check-tick' },
                { text: 'Exclusive', iconCss: 'e-gate e-bpmn-icons e-ExclusiveGatewayWithMarker', id: 'Exclusive' },
                { text: 'Inclusive', iconCss: 'e-gate e-bpmn-icons e-InclusiveGateway', id: 'Inclusive' },
                { text: 'Parallel', iconCss: 'e-gate e-bpmn-icons e-ParallelGateway', id: 'GatewayParallel' },
                { text: 'Complex', iconCss: 'e-gate e-bpmn-icons e-ComplexGateway', id: 'Complex' },
                { text: 'Event Based', iconCss: 'e-gate e-bpmn-icons e-EventBasedGateway', id: 'EventBased' },
                { text: 'Exclusive Event Based', iconCss: 'e-gate e-bpmn-icons e-ExclusiveEventBased', id: 'ExclusiveEventBased' },
                { text: 'Parallel Event Based', iconCss: 'e-gate e-bpmn-icons e-ParallelEventBasedGatewaytostart', id: 'ParallelEventBased' }
            ]
        },
        {
            text: 'Message Type', id: 'MessageType', items: [
                    {text: 'Default', id: 'None',iconCss:'e-bpmn-icons'}, {text: 'Initiating Message', id: 'InitiatingMessage',iconCss:'e-bpmn-icons'},
                    {text: 'Non-Initiating Message', id: 'NonInitiatingMessage',iconCss:'e-bpmn-icons'},
            ]
        },
        {
            text:'Add Text Annotation',id:'TextAnnotation',iconCss:'e-bpmn-icons e-TextAnnotation'
        }
    ],
    showCustomMenuOnly: true,
};

function arrangeMenuBeforeOpen(args)
{
    for (var i = 0; i < args.element.children.length; i++) {
        args.element.children[i].style.display = 'block';
    }
    //(args.element.children[0]).style.display = 'block';
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
}

function arrangeMenuBeforeClose(args)
{
    if (args.event && ej.base.closest(args.event.target, '.e-dropdown-btn') !== null) {
        args.cancel = true;
    }
    if (!args.element) {
        args.cancel = true;
    }
}

function beforeItemRender(args) {
    var shortCutText = getShortCutKey(args.item.text);
    if (shortCutText) {
        var shortCutSpan = document.createElement('span');
        var text = args.item.text;
        shortCutSpan.textContent = shortCutText;
        shortCutSpan.style.pointerEvents = 'none';
        args.element.appendChild(shortCutSpan);
        shortCutSpan.setAttribute('class', 'db-shortcut');
    }
    var status = enableMenuItems(args.item.text, diagram);
    if (status) {
        args.element.classList.add('e-disabled');
    } else {
        if (args.element.classList.contains('e-disabled')) {
            args.element.classList.remove('e-disabled');
        }
    }
}

function getShortCutKey(menuItem) {
    var shortCutKey = navigator.platform.indexOf('Mac') > -1 ? 'Cmd' : 'Ctrl';
    switch (menuItem) {
        case 'New':
            shortCutKey = 'Shift' + '+N';
            break;
        case 'Open':
            shortCutKey = shortCutKey + '+O';
            break;
        case 'Save':
            shortCutKey = shortCutKey + '+S';
            break;
        case 'Undo':
            shortCutKey = shortCutKey + '+Z';
            break;
        case 'Redo':
            shortCutKey = shortCutKey + '+Y';
            break;
        case 'Cut':
            shortCutKey = shortCutKey + '+X';
            break;
        case 'Copy':
            shortCutKey = shortCutKey + '+C';
            break;
        case 'Paste':
            shortCutKey = shortCutKey + '+V';
            break;
        case 'Delete':
            shortCutKey = 'Delete';
            break;
        case 'Select All':
            shortCutKey = shortCutKey + '+A';
            break;
        case 'Zoom In':
            shortCutKey = shortCutKey + '++';
            break;
        case 'Zoom Out':
            shortCutKey = shortCutKey + '+-';
            break;
        case 'Zoom to Fit':
            shortCutKey = shortCutKey + '+0';
            break;
        case 'Zoom to 50%':
            shortCutKey = shortCutKey + '+1';
            break;
        case 'Zoom to 100%':
            shortCutKey = shortCutKey + '+2';
            break;
        case 'Zoom to 200%':
            shortCutKey = shortCutKey + '+3';
            break;
        default:
            shortCutKey = '';
            break;
    }
    return shortCutKey;
}

function enableMenuItems(itemText, diagram) {
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    if (itemText) {
        var commandType = itemText.replace(/[' ']/g, '');
        if (selectedItems.length === 0) {
            switch (commandType.toLowerCase()) {
                case 'cut':
                    return true;
                case 'copy':
                    return true;
                case 'delete':
                    return true;
            }
        }
        if (!(diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined) && itemText === 'Paste') {
            return true;
        }
        if (itemText === 'Undo' && diagram.historyManager.undoStack.length<1) {
            return true;
        }
        if (itemText === 'Redo' && diagram.historyManager.redoStack.length<1) {
            return true;
        }
        if(itemText === 'Rotate Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Rotate Counter Clockwise' && diagram.selectedItems.nodes.length < 1)
        {
            return true;
        }
        if(itemText === 'Send To Back' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring To Front' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Bring Forward' && selectedItems.length === 0)
        {
            return true;
        }
        if(itemText === 'Send Backward' && selectedItems.length === 0)
        {
            return true;
        }
    }
    return false;
};

function menumouseover(args) {
    var target = args.target;
    if (target && (target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu' ||
        target.className === 'e-control e-dropdown-btn e-lib e-btn db-dropdown-menu e-ddb-active')) {
        if (this.buttonInstance && this.buttonInstance.id !== target.id) {
            if (this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement = document.getElementById(this.buttonInstance.element.id);
                buttonElement.classList.remove('e-btn-hover');
            }
        }
        var button1 = target.ej2_instances[0];
        this.buttonInstance = button1;
        if (button1.getPopUpElement().classList.contains('e-popup-close')) {
            button1.toggle();
            if(button1.element.id === 'btnEditMenu') {
                enableEditMenuItems(diagram);
            }
            var buttonElement1 = document.getElementById(this.buttonInstance.element.id);
            buttonElement1.classList.add('e-btn-hover');
        }
    } else {
        if (ej.base.closest(target, '.e-dropdown-popup') === null && ej.base.closest(target, '.e-dropdown-btn') === null) {
            if (this.buttonInstance && this.buttonInstance.getPopUpElement().classList.contains('e-popup-open')) {
                this.buttonInstance.toggle();
                var buttonElement2 = document.getElementById(this.buttonInstance.element.id);
                buttonElement2.classList.remove('e-btn-hover');
            }
        }
    }
};
function enableEditMenuItems(diagram)
{
    var contextInstance = document.getElementById('editContextMenu');
    var contextMenu = contextInstance.ej2_instances[0];
    var selectedItems = diagram.selectedItems.nodes;
    selectedItems = selectedItems.concat(diagram.selectedItems.connectors);
    for (var i = 0; i < contextMenu.items.length; i++) {
        contextMenu.enableItems([contextMenu.items[i].text], false);
    }
    var objects = diagram.selectedItems.nodes.concat(diagram.selectedItems.connectors);
        if(objects.length>0)
        {
            contextMenu.enableItems(['Cut', 'Copy', 'Delete','Order Commands','Rotate']);
        }
        if(diagram.historyManager.undoStack.length>0){
            contextMenu.enableItems(['Undo']);
        }
        if(diagram.historyManager.redoStack.length>0){
            contextMenu.enableItems(['Redo']);
        }
        if((diagram.commandHandler.clipboardData.pasteIndex !== undefined
            && diagram.commandHandler.clipboardData.clipObject !==undefined)){
                contextMenu.enableItems(['Paste']);
            }  
}

    //Initialize Toolbar component
    var toolbarObj = new ej.navigations.Toolbar({
        clicked: function (args) { UtilityMethods.prototype.toolbarClick(args)},
        created: function(args) {
            if(diagram!== undefined){
                var conTypeBtn = new ej.splitbuttons.DropDownButton({
                    items: conTypeItems, iconCss:'sf-icon-orthogonal_line',
                    cssClass:(diagram.tool === 16 && diagram.drawingObject.shape.type === 'Bpmn')? 'tb-item-middle tb-item-selected' : 'tb-item-middle',
                    select: function (args) {UtilityMethods.prototype.onConnectorSelect(args)}
                });
                conTypeBtn.appendTo('#conTypeBtn');
                var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange,
                });
                 btnZoomIncrement.appendTo('#btnZoomIncrement');
                var hidePropertyBtn = new ej.buttons.Button({
                    iconCss:'sf-icon-properties',isPrimary: true
                });
                hidePropertyBtn.appendTo('#hideProperty');
            }
        },
        items: DropDownDataSources.prototype.toolbarItems(),
        overflowMode: 'Scrollable',
        width:'100%',
        // overflowMode: 'Popup'
 });
 //Render initialized Toolbar component
 var conTypeItems = [
                     {text: 'Straight',iconCss: 'sf-icon-straight_line'},
                     {text: 'Orthogonal',iconCss: 'sf-icon-orthogonal_line'},
                     {text: 'Bezier',iconCss: 'sf-icon-bezier'}
                    ];

var zoomMenuItems = [
    { text: 'Zoom In' },{ text: 'Zoom Out' },{ text: 'Zoom to Fit' },{ text: 'Zoom to 50%' },
    { text: 'Zoom to 100%' },{ text: 'Zoom to 200%' },
                    ];
conTypeBtn = new ej.splitbuttons.DropDownButton({
    items: conTypeItems, iconCss:'sf-icon-orthogonal_line',
    select: function (args) {UtilityMethods.prototype.onConnectorSelect(args)}
});

var uploadObj = new ej.inputs.Uploader({
    asyncSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    success: onUploadSuccess,
    showFileList:false
});
uploadObj.appendTo('#fileupload');


 toolbarObj.appendTo('#toolbarObj');
 conTypeBtn.appendTo('#conTypeBtn');
 hidePropertyBtn = new ej.buttons.Button({
    iconCss:'sf-icon-properties',isPrimary: true
 });
 hidePropertyBtn.appendTo('#hideProperty');

 window.hideClicked = () =>{
    hideElements('hide-properties', diagram);
 }
  
document.getElementById('diagramName').onclick = (args)=>{
    renameDiagram ();
  }
  document.addEventListener('DOMContentLoaded', () => {
    const editableElement = document.getElementById('diagramEditable');
  
    if (editableElement) {
      editableElement.addEventListener('keydown', diagramNameKeyDown);
      editableElement.addEventListener('focusout', diagramNameChange);
    }
    function diagramNameKeyDown(args) {
      if (args.which === 13) {
          document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
          document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
      }
    }
    
    function diagramNameChange(args) {
      document.getElementById('diagramName').innerHTML = document.getElementById('diagramEditable').value;
      document.getElementsByClassName('db-diagram-name-container')[0].classList.remove('db-edit-name');
      document.getElementById("exportfileName").value = document.getElementById('diagramName').innerHTML;
    }
  });
 function hideElements(elementType, diagram) {
    var diagramContainer = document.getElementsByClassName('diagrambuilder-container')[0];
    if (diagramContainer.classList.contains(elementType)) {
        diagramContainer.classList.remove(elementType);
        document.getElementById('hideProperty').style.backgroundColor = ''
        document.getElementById('hideProperty').style.color = '#fff'
        hidePropertyBtn.isPrimary = true;
    } else {
        diagramContainer.classList.add(elementType);
        document.getElementById('hideProperty').style.backgroundColor = '#e3e3e3'
        document.getElementById('hideProperty').style.color = 'black'
        hidePropertyBtn.isPrimary = false;
    }
    if (diagram) {
        diagram.updateViewPort();
    }
}
 function onUploadSuccess(args) {
    var file1 = args.file;
    var file = file1.rawFile;
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = loadDiagram;
    uploadObj.clearAll();
}
//Load the diagraming object.
function loadDiagram(event) {
    diagram.loadDiagram(event.target.result);
}

// To perform zoom operation
 function zoomChange(args){
    var zoomCurrentValue = document.getElementById("btnZoomIncrement").ej2_instances[0];
        var currentZoom = diagram.scrollSettings.currentZoom;
        var zoom = {};
        switch (args.item.text) {
            case 'Zoom In':
                diagram.zoomTo({ type: 'ZoomIn', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom Out':
                diagram.zoomTo({ type: 'ZoomOut', zoomFactor: 0.2 });
                zoomCurrentValue.content = (diagram.scrollSettings.currentZoom * 100).toFixed() + '%';
                break;
            case 'Zoom to Fit':
                diagram.fitToPage({ mode: 'Page', region: 'Content'});
                zoomCurrentValue.content = diagram.scrollSettings.currentZoom;
                break;
            case 'Zoom to 50%':
                zoom.zoomFactor = (0.5 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 100%':
                zoom.zoomFactor = (1 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
            case 'Zoom to 200%':
                zoom.zoomFactor = (2 / currentZoom) - 1;
                diagram.zoomTo(zoom);
                break;
        }
      
        zoomCurrentValue.content = Math.round(diagram.scrollSettings.currentZoom*100) + ' %';
        
}

var diagram = new ej.diagrams.Diagram({
    width: '100%', height: '100%',
    nodes: nodes,
    connectors:connectors,
    drawingObject:{type:'Orthogonal',shape:{type:'Bpmn',sequence:'Normal'}},
    pageSettings:{showPageBreaks:true},
    pageSettings: {
        background: { color: '#FFFFFF' }, width: 600, height: 1500, margin: { left: 5, top: 5 },
        orientation: 'Landscape',showPageBreaks:false,multiplePage : false
    },
    scrollSettings: { canAutoScroll: true, scrollLimit: 'Infinity', minZoom: 0.25, maxZoom: 30 },
    getNodeDefaults: function (args) { diagramEvents.getNodeDefaults(args); },
    getConnectorDefaults:function (args) { diagramEvents.getConnectorDefaults(args); },
    contextMenuSettings: contextMenu,
    contextMenuClick:function (args) { diagramEvents.contextMenuClick(args); },
    contextMenuOpen:function (args) { diagramEvents.contextMenuOpen(args); },
    onUserHandleMouseDown:function (args) { diagramEvents.userHandleClick(args); },
    historyChange: function (args) { diagramEvents.historyChange(args); },
    // selectionChange:selectionChange, 
    selectionChange: function (args) { diagramEvents.selectionChange(args); },
    positionChange: function (args) { diagramEvents.positionChange(args); },
    sizeChange: function (args) { diagramEvents.sizeChange(args); },
    rotateChange: function (args) { diagramEvents.rotateChange(args); },
    dragEnter:function (args) { diagramEvents.dragEnter(args); },
    created: function (args) { diagramEvents.created(args);},
    scrollChange: function (args) { diagramEvents.scrollChange(args);},
    rulerSettings: {
        showRulers: true, dynamicGrid: true, horizontalRuler: { interval: 10,segmentWidth: 100,thickness: 25,markerColor:'#0078d4'},
        verticalRuler: { interval: 10,segmentWidth: 100,thickness: 25,markerColor:'#0078d4'},
    },
    commandManager: {  commands : [{
        name: 'New',
        canExecute: function () {
           return true
        },
        execute: function () {
            diagram.clear();
        },
        gesture: {
            key: ej.diagrams.Keys.N,
            keyModifiers: ej.diagrams.KeyModifiers.Shift
        }
    },
    {
        name: 'Save',
        canExecute: function () {
           return true
        },
        execute: function () {
            UtilityMethods.prototype.download(diagram.saveDiagram());
        },
        gesture: {
            key: ej.diagrams.Keys.S,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    {
        name: 'Open',
        canExecute: function () {
           return true
        },
        execute: function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        },
        gesture: {
            key: ej.diagrams.Keys.O,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    {
        name: 'Rotate Right 90',
        canExecute: function () {
            if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                 return true
            }
           return false
        },
        execute: function () {
            diagram.rotate(diagram.selectedItems,90);
        },
        gesture: {
            key: ej.diagrams.Keys.R,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    {
        name: 'Rotate Left 90',
        canExecute: function () {
            if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                 return true
            }
           return false
        },
        execute: function () {
            diagram.rotate(diagram.selectedItems,-90);
        },
        gesture: {
            key: ej.diagrams.Keys.L,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    {
        name: 'Flip Horizontal',
        canExecute: function () {
            if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                 return true
            }
           return false
        },
        execute: function () {
            UtilityMethods.prototype.flipObjects('Flip Horizontal');
        },
        gesture: {
            key: ej.diagrams.Keys.H,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    {
        name: 'Flip Vertical',
        canExecute: function () {
            if(diagram.selectedItems.nodes.length >0 || diagram.selectedItems.connectors.length>0){
                 return true
            }
           return false
        },
        execute: function () {
            UtilityMethods.prototype.flipObjects('Flip Vertical');
        },
        gesture: {
            key: ej.diagrams.Keys.J,
            keyModifiers: ej.diagrams.KeyModifiers.Control
        }
    },
    ]}
});

    diagram.appendTo('#diagram');
const menuItems = dataSourceInstance.menuItems;
var menuBar = new ej.navigations.Menu({
    content: 'Menu',
    cssClass: 'db-dropdown-menu',
    items: menuItems,
    select: function (args) { UtilityMethods.prototype.menuClick(args) },
    beforeItemRender: beforeItemRender,
    beforeOpen: arrangeMenuBeforeOpen,
    beforeClose: arrangeMenuBeforeClose,
});
menuBar.appendTo('#diagram-menu');
    var btnZoomIncrement = new ej.splitbuttons.DropDownButton({ items: zoomMenuItems, content: Math.round(diagram.scrollSettings.currentZoom*100) + ' %', select: zoomChange,
     });
    btnZoomIncrement.appendTo('#btnZoomIncrement');
var palette = new ej.diagrams.SymbolPalette({
    expandMode: 'Multiple', 
    symbolMargin: { left: 10, right: 15, top: 15, bottom: 10 }, 
    // symbolHeight: 60, symbolWidth: 55,
    getSymbolInfo: function (symbol) {
        return {  tooltip: symbol.id.replace('_',' ')};
    },
    palettes: [
        { id: 'Bpmn', expanded: true, symbols: bpmnShapes, title: 'BPMN Shapes' },
    ],enableSearch:true,
    width: '100%', height: '100%',
});

palette.appendTo('#symbolpalette');

// Property panel

var pageSettingsList = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.paperList(),
    change: function (args) {UtilityMethods.prototype.paperListChange(args); },
    fields: { text: 'text', value: 'value' },
    index: 0
});
pageSettingsList.appendTo('#pageSettingsList');

var pagePortrait = new ej.buttons.Button({
    iconCss: 'sf-icon-portrait', isToggle:true,cssClass: `e-flat e-primary`
});
pagePortrait.appendTo('#pagePortrait');

 var pageLandscape = new ej.buttons.Button({
    iconCss: 'sf-icon-landscape', isToggle:true,cssClass: `e-flat e-primary e-active`
});
pageLandscape.appendTo('#pageLandscape');

document.getElementById('pagePortrait').onclick = (args)=>{
    UtilityMethods.prototype.pageOrientationChange(args);
}
document.getElementById('pageLandscape').onclick = (args)=>{
    UtilityMethods.prototype.pageOrientationChange(args);
}

var pageWidth = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.width,
    change: function (args) { UtilityMethods.prototype.pageDimensionChange(args); }
});
pageWidth.appendTo('#pageWidth');

var pageHeight = new ej.inputs.NumericTextBox({
    min: 100,
    format: 'n0',
    value: diagram.pageSettings.height,
    change: function (args) { UtilityMethods.prototype.pageDimensionChange(args); }
});
pageHeight.appendTo('#pageHeight');


var pageBgColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    width: '100%',
    height:30,
    showButtons:false,
    value: diagram.pageSettings.background.color,
    change: function (args) { UtilityMethods.prototype.pageBackgroundChange1(args); }
});
pageBgColor.appendTo('#pageBgColor');
var pageBgColorPickerBtn = new ej.buttons.Button({ iconCss: 'sf-icon-fil_colour' });
    pageBgColorPickerBtn.appendTo('#pageBgColorPickerBtn');

var showPageBreaks = new ej.buttons.CheckBox({ label: 'Page Breaks', checked: diagram.pageSettings.showPageBreaks,
change: function (args) { UtilityMethods.prototype.pageBreaksChange(args); } });
showPageBreaks.appendTo('#showPageBreaks');

    var nodeOffsetX = new ej.inputs.NumericTextBox({
        format: 'n0',
        change: function(args) {
            if(args.isInteracted) {
               nodeProperties.offsetX.value = args.value;
               PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetX', propertyValue: args });
            }
        }
    });
    nodeOffsetX.appendTo('#nodeOffsetX');
    nodeProperties.offsetX = nodeOffsetX;

    var nodeOffsetY = new ej.inputs.NumericTextBox({
        format: 'n0',
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.offsetY.value = args.value;
             PropertyChange.prototype.nodePropertyChange({ propertyName: 'offsetY', propertyValue: args });
            }
        }
    });
    nodeOffsetY.appendTo('#nodeOffsetY');
    nodeProperties.offsetY = nodeOffsetY;

    var nodeWidth = new ej.inputs.NumericTextBox({
        format: 'n0',
        min: 1,
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.width.value = args.value;
              PropertyChange.prototype.nodePropertyChange({ propertyName: 'width', propertyValue: args });
            }
        }
    });
    nodeWidth.appendTo('#nodeWidth');
    nodeProperties.width = nodeWidth;

    var nodeHeight = new ej.inputs.NumericTextBox({
        format: 'n0',
        min: 1,
        change: function(args) {
            if(args.isInteracted) {
              nodeProperties.height.value = args.value;
              PropertyChange.prototype.nodePropertyChange({ propertyName: 'height', propertyValue: args });
            }
        }
    });
    nodeHeight.appendTo('#nodeHeight');
   nodeProperties.height = nodeHeight;

var aspectRatioBtn = new ej.buttons.Button({
    iconCss: 'sf-icon-unlock', isToggle:true, cssClass:'e-flat'
});
aspectRatioBtn.appendTo('#aspectRatioBtn');
nodeProperties.aspectRatio = aspectRatioBtn;

document.getElementById('aspectRatioBtn').onclick = (args) =>{
    PropertyChange.prototype.aspectRatioClick(args);
}

   var rotateIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-rotate' });
   rotateIconBtn.appendTo('#rotateIconBtn');

   var nodeRotateAngle = new ej.inputs.NumericTextBox({
       format: 'n0',
       change: function(args) {
           nodeProperties.rotateAngle.value = args.value;
           PropertyChange.prototype.nodePropertyChange({ propertyName: 'rotateAngle', propertyValue: args });
       }
   });
   nodeRotateAngle.appendTo('#nodeRotateAngle');
   nodeProperties.rotateAngle = nodeRotateAngle;

   var toolbarNodeInsert = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { UtilityMethods.prototype.toolbarInsertClick(args)},
    items: [
        { prefixIcon: 'sf-icon-insert_link', tooltipText: 'Insert Link', cssClass: 'tb-item-start' },
    ]
});
toolbarNodeInsert.appendTo('#toolbarNodeInsert');
var button = new ej.buttons.Button({
    cssClass: 'e-outline', isPrimary: true ,
    onClick: function (args) { UtilityMethods.prototype.toolbarInsertClick(args)},
});
button.appendTo('#insertBtn');
var insertButton = document.getElementById('insertBtn');
insertButton.onclick = (args) =>{
    UtilityMethods.prototype.toolbarInsertClick(args)
}

var backgroundTypeDropdown = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.borderTypeList(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '200px',
    index: 0,
    change: function(args) {
        var gradientElement = document.getElementById('gradientStyle');
        if(args.value === 'Gradient')
        {
            gradientElement.className  = 'row db-prop-row db-gradient-style-show';
        }
        else{
            gradientElement.className = 'row db-prop-row db-gradient-style-hide';

        }
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradient', propertyValue: args });
    }
});
backgroundTypeDropdown.appendTo('#backgroundTypeDropdown');
nodeProperties.gradient = backgroundTypeDropdown; 

var nodeFillColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        PropertyChange.prototype.nodePropertyChange({propertyName: 'fillColor', propertyValue: args.currentValue.hex});
    }
});
nodeFillColor.appendTo('#nodeFillColor');
nodeProperties.fillColor = nodeFillColor;

var gradientDirection =  new ej.splitbuttons.DropDownButton({
    items: DropDownDataSources.prototype.gradientDirections(),
    iconCss: 'sf-icon-gradient-alignment',
    select: function (args) {
        nodeProperties.gradientDirection.value = args.item.text; 
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradientDirection', propertyValue: args }); 
    },
});
gradientDirection.appendTo('#gradientDirection');
nodeProperties.gradientDirection = gradientDirection;

var nodeGradientColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodeProperties.gradientColor.value = args.currentValue.hex;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'gradientColor', propertyValue: args });
    }
});
nodeGradientColor.appendTo('#nodeGradientColor');
nodeProperties.gradientColor = nodeGradientColor;


var nodeStrokeColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        nodeProperties.strokeColor.value = args.currentValue.hex;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeColor', propertyValue: args });
    }
});
nodeStrokeColor.appendTo('#nodeStrokeColor');
nodeProperties.strokeColor = nodeStrokeColor;


var nodeBorderStyle = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.borderStyles(),
    fields: { text: 'text', value: 'value' },
    index: 0,
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function (args) {
        nodeProperties.strokeStyle.value= args.itemData.text;
        PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeStyle', propertyValue: args });
    }
});
nodeBorderStyle.appendTo('#nodeBorderStyle');
nodeProperties.strokeStyle = nodeBorderStyle;

var nodeStrokeWidth = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function (args) {
       nodeProperties.strokeWidth.value= args.value;
       PropertyChange.prototype.nodePropertyChange({ propertyName: 'strokeWidth', propertyValue: args });
   }
});
nodeStrokeWidth.appendTo('#nodeStrokeWidth');
nodeProperties.strokeWidth = nodeStrokeWidth;

var nodeOpacitySlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 1,
    change: function (args) {
       nodeProperties.opacity.value= args.value;
       PropertyChange.prototype.nodePropertyChange({ propertyName: 'opacity', propertyValue: args });
   }
});
nodeOpacitySlider.appendTo('#nodeOpacitySlider');

var lineTypeDropdown = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.lineTypes(),
    fields: { text: 'text', value: 'value' },
    change: function(args) {
        connectorProperties.lineType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineType', propertyValue: args });
    }
});
lineTypeDropdown.appendTo('#lineTypeDropdown');
connectorProperties.lineType = lineTypeDropdown;

var lineColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function(args) {
        connectorProperties.lineColor.value = args.currentValue.hex;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineColor', propertyValue: args });
    }
});
lineColor.appendTo('#lineColor');
connectorProperties.lineColor = lineColor;

var lineColorIconBtn = new ej.buttons.Button({ iconCss: 'sf-icon-border_colour' });
lineColorIconBtn.appendTo('#lineColorIconBtn');

var lineStyle = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.lineStyles(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '160px',
    itemTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    valueTemplate: '<div class="db-ddl-template-style"><span class="${className}"></span></div>',
    change: function(args) {
        connectorProperties.lineStyle.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineStyle', propertyValue: args });
    }
});
lineStyle.appendTo('#lineStyle');
connectorProperties.lineStyle =  lineStyle;

var lineWidth = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.lineWidth.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'lineWidth', propertyValue: args });
    }
});
lineWidth.appendTo('#lineWidth');
connectorProperties.lineWidth = lineWidth;

var sourceType = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.decoratorList(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '140px',
    change: function(args) {
        connectorProperties.sourceType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'sourceType', propertyValue: args });
    }
});
sourceType.appendTo('#sourceType');
connectorProperties.sourceType = sourceType;

var sourceSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.sourceSize.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'sourceSize', propertyValue: args });
    }
});
sourceSize.appendTo('#sourceSize');
connectorProperties.sourceSize = sourceSize;

var targetType = new ej.dropdowns.DropDownList({
    dataSource: DropDownDataSources.prototype.decoratorList(),
    fields: { text: 'text', value: 'value' },
    popupWidth: '140px',
    change: function(args) {
        connectorProperties.targetType.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'targetType', propertyValue: args });
    }
});
targetType.appendTo('#targetType');
connectorProperties.targetType = targetType;

var targetSize = new ej.inputs.NumericTextBox({
    min: 1,
    step: 1,
    format: 'n0',
    change: function(args) {
        connectorProperties.targetSize.value = args.value;
        PropertyChange.prototype.connectorPropertyChange({ propertyName: 'targetSize', propertyValue: args });
    }
});
targetSize.appendTo('#targetSize');
connectorProperties.targetSize = targetSize;

var lineJump = new ej.buttons.CheckBox({ label: 'Bridging',
    change: function(args) {
        if (args.checked) {
            document.getElementById('lineJumpSizeDiv').style.display = '';
        }
        else {
            document.getElementById('lineJumpSizeDiv').style.display = 'none';
        }
        PropertyChange.prototype.connectorPropertyChange({propertyName: 'lineJump', propertyValue: args});
       }
    });
    lineJump.appendTo('#lineJump');
    connectorProperties.lineJump = lineJump;

    var lineJumpSize = new ej.inputs.NumericTextBox({
        min: 1,
        step: 1,
        format: 'n0',
        change: function(args) {
            connectorProperties.lineJumpSize.value = args.value;
            PropertyChange.prototype.connectorPropertyChange({propertyName: 'lineJumpSize', propertyValue: args});
         }
    });
    lineJumpSize.appendTo('#lineJumpSize');
    connectorProperties.lineJumpSize = lineJumpSize;

    var default1 = new ej.inputs.Slider({
        min: 0,
        max: 100,
        step: 10,
        type: 'MinRange',
        value: 0,
        change: function (args) {
            connectorProperties.opacity.value= args.value;
            PropertyChange.prototype.connectorPropertyChange({ propertyName: 'opacity', propertyValue: args });
        }
   });
   default1.appendTo('#default1');
   connectorProperties.opacity = default1;

var fontFamily = new ej.dropdowns.DropDownList({
dataSource: DropDownDataSources.prototype.fontFamilyList(),
    height: '34px',
    fields: { text: 'text', value: 'value' },
    change: function (args) {
        textProperties.fontFamily.value = args.value;
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontFamily', propertyValue: args});
    }
});
fontFamily.appendTo('#fontFamily');
textProperties.fontFamily = fontFamily;

var fontSizeTextProperties = new ej.inputs.NumericTextBox({
    min: 5,
    step: 1,
    max:40,
    format: 'n0',
    change: function (args) {
        textProperties.fontSize.value = args.value;
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontSize', propertyValue: args});
    }
});
fontSizeTextProperties.appendTo('#fontSizeTextProperties');
textProperties.fontSize = fontSizeTextProperties;


var ddlTextPosition = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.textPositionDataSource(),
    fields: { text: 'text', value: 'value' },
    index: 4,
    change: function (args) { textPositionChange(args); }
});
ddlTextPosition.appendTo('#ddlTextPosition');

var textColor = new ej.inputs.ColorPicker({
    mode: 'Palette',
    showButtons:false,
    modeSwitcher: true,
    change: function (args) {
        textProperties.fontColor.value = args.currentValue.hex;
        PropertyChange.prototype.textPropertyChange({propertyName: 'fontColor', propertyValue: args});
    }
});
textColor.appendTo('#textColor');
textProperties.fontColor = textColor;

var fontColorBtn = new ej.buttons.Button({ iconCss: 'sf-icon-border_colour' });
fontColorBtn.appendTo('#fontColorBtn');

var toolbarTextStyle = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextStyleChange(args); },
    items: [
        { prefixIcon: 'sf-icon-bold ', tooltipText: 'Bold', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-italic', tooltipText: 'Italic', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-underline', tooltipText: 'Underline', cssClass: 'tb-item-end' }
    ]
});
toolbarTextStyle.appendTo('#toolbarTextStyle');

var toolbarTextSubAlignment = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked:  function (args) { toolbarTextSubAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-align-left', tooltipText: 'Align Text Left', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-align-center', tooltipText: 'Align Text Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align-right', tooltipText: 'Align Text Right', cssClass: 'tb-item-end' }
    ]
});
toolbarTextSubAlignment.appendTo('#toolbarTextSubAlignment');

var toolbarTextAlignmentLeft = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-align-text-left', tooltipText: 'Align Right', cssClass: 'tb-item-start' },
        { prefixIcon: 'sf-icon-align-text-horizontal-center', tooltipText: 'Align Center', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align-text-rignt', tooltipText: 'Align Left', cssClass: 'tb-item-middle' },
    ]
});
toolbarTextAlignmentLeft.appendTo('#toolbarTextAlignmentLeft');
var toolbarTextAlignmentTop = new ej.navigations.Toolbar({
    overflowMode: 'Scrollable',
    clicked: function (args) { toolbarTextAlignChange(args); },
    items: [
        { prefixIcon: 'sf-icon-align-text-top', tooltipText: 'Align Top', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align-text-vertical-center', tooltipText: 'Align Middle', cssClass: 'tb-item-middle' },
        { prefixIcon: 'sf-icon-align-text-bottom', tooltipText: 'Align Bottom', cssClass: 'tb-item-end' }
    ]
});
toolbarTextAlignmentTop.appendTo('#toolbarTextAlignmentTop');

var opacityTextSlider = new ej.inputs.Slider({
    min: 0,
    max: 100,
    step: 10,
    type: 'MinRange',
    value: 0,
    change: function (args) {
        textProperties.opacity.value= args.value;
        PropertyChange.prototype.textPropertyChange({ propertyName: 'opacity', propertyValue: args });
    }
});
opacityTextSlider.appendTo('#opacityTextSlider');


function textPositionChange(args) {
    if (args.value !== null) {
        PropertyChange.prototype.textPropertiesChange('textPosition', args.value);
    }
};

function toolbarTextStyleChange(args) {
    PropertyChange.prototype.textPropertiesChange(args.item.tooltipText, false);
};
function toolbarTextSubAlignChange(args) {
    var propertyName = args.item.tooltipText.replace(/[' ']/g, '');
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};
function toolbarTextAlignChange(args) {
    var propertyName = args.item.tooltipText.replace('Align ', '');
    if(propertyName === 'Top'){
        propertyName = 'Bottom';
    }
    else if(propertyName === 'Bottom'){
        propertyName = 'Top';
    }
    PropertyChange.prototype.textPropertiesChange(propertyName, propertyName);
};

var hyperlinkDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Insert Link',
    target: document.body,
    isModal:true,
    animationSettings: { effect: 'None' },
    showCloseIcon: true,
    visible: false,
    buttons: UtilityMethods.prototype.getDialogButtons('hyperlink'),
    content: '<div id="hyperlinkDialogContent"><div class="row"><div class="row">Enter URL</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlink">' +
    '</div></div><div class="row db-dialog-prop-row"><div class="row">Link Text (Optional)</div><div class="row db-dialog-child-prop-row"><input type="text" id="hyperlinkText"></div></div></div>'
});
hyperlinkDialog.appendTo('#hyperlinkDialog');

var exportDialog = new ej.popups.Dialog({
    width: '400px',
    header: 'Export Diagram',
    target: document.body,
    isModal: true,
    animationSettings: { effect: 'None' },
    buttons: UtilityMethods.prototype.getDialogButtons('export'),
    visible: false,
    showCloseIcon: true,
    content: '<div id="exportDialogContent"><div class="row"><div class="row"> File Name </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportfileName" value = "Untitled Diagram"></div></div>' +
     '<div class="row db-dialog-prop-row"> <div class="col-xs-6 db-col-left"> <div class="row"> Format </div>' +
     '<div class="row db-dialog-child-prop-row"> <input type="text" id="exportFormat"/> </div> </div>' +
     '<div class="col-xs-6 db-col-right"> <div class="row"> Region </div> <div class="row db-dialog-child-prop-row">' +
     '<input type="text" id="exportRegion"/></div></div></div></div>'
});
exportDialog.appendTo('#exportDialog');

var exportFormat = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.fileFormats(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.format,
});
exportFormat.appendTo('#exportFormat');

  // dropdown template for exportDialog control
var exportRegion = new ej.dropdowns.DropDownList({
    dataSource:DropDownDataSources.prototype.diagramRegions(),
    fields: { text: 'text', value: 'value' },
    value: exportSettings.region
});
exportRegion.appendTo('#exportRegion');