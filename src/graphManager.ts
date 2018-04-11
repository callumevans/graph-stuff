import { jsPlumb } from 'jsplumb';
import { NodeDataMapItem, OutputEndpointIdentifier } from './graphData';
import NodeInterface from './nodeInterface';
import { GraphData } from './graphData';

export default class GraphManager {
    private instance: any;
    private graphData: GraphData;

    constructor() {
        this.instance = jsPlumb.getInstance();
        this.graphData = new GraphData();
    }

    initialise(elementId: HTMLElement, callback: () => void) {
        this.instance.ready(() => {
            this.instance.setContainer(elementId);
            callback();
        });

        this.instance.bind('connection', () =>
            this.graphData.connections = this.instance.getAllConnections());

        this.instance.bind('connectionMoved', () =>
            this.graphData.connections = this.instance.getAllConnections());

        this.instance.bind('connectionDetached', () =>
            this.graphData.connections = this.instance.getAllConnections());
    }

    public addNode(node: NodeInterface) {
        let nodeTracker = new NodeDataMapItem(node);

        let domElement = document.createElement('div');
        domElement.classList.add('tch-box');

        if (node.isEntry) {
            domElement.classList.add('entry');
        }

        this.instance.getContainer().appendChild(domElement);

        // Input endpoint
        if (!node.isEntry) {
            nodeTracker.inputEndpointId = this.instance.addEndpoint(domElement, {
                endpoint: 'Dot',
                anchor: [0, 0, 0, -1, 60, 0],
                isSource: false,
                isTarget: true,
                connector: 'Flowchart',
                maxConnections: 10
            }).id;
        }

        // Output endpoints
        for (let i = 0; i < node.outputs.length; i++) {
            let endpointInstance = this.instance.addEndpoint(domElement, {
                endpoint: 'Dot',
                anchor: [0, 1, 0, 1, (i + 1) * 40, 0],
                isSource: true,
                isTarget: false,
                connector: 'Flowchart'
            });

            nodeTracker.outputEndpoints.push(
                new OutputEndpointIdentifier(
                    node.outputs[i],
                    endpointInstance.id));
        }

        this.instance.draggable(domElement, {
            grid: [10, 10]
        });

        // Save node to internal graph
        this.graphData.nodes.push(nodeTracker);
    }
}
