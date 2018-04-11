import { GraphData, NodeDataMapItem } from './graphData';

export function execute(graphData: GraphData) {
    let entryNodes = graphData.nodes.filter((item) => {
        return item.nodeType.isEntry === true;
    });

    if (entryNodes.length < 1) {
        throw new Error('No entry node found.');
    }

    if (entryNodes.length > 1) {
        throw new Error('More than one entry node specified.')
    }

    let entryNode = entryNodes[0];
    runNode(graphData, entryNode);
}

function runNode(graphData: GraphData, node: NodeDataMapItem) {
    let outputPinResultKey;
    let iterations = 0;

    while (true) {
        iterations++;
        outputPinResultKey = node.nodeType.action();

        if (!outputPinResultKey) {
            console.warn('Graph finished. No output specified.');
            break;
        }

        let nextNode = findEndpointFromResult(node, outputPinResultKey, graphData);

        if (nextNode === null) {
            console.warn('Graph finished. No connection found for output.');
            break;
        }

        if (iterations > 999) {
            console.error('Too many iterations. Aborting loop.');
            break;
        }

        node = nextNode;
    }
}

function findEndpointFromResult(node: NodeDataMapItem,
                                outputPinResultKey: string,
                                graphData: GraphData): NodeDataMapItem | null {

    const endpointToFind = node.outputEndpoints.filter(
        x => x.outputKey === outputPinResultKey)[0];

    if (!endpointToFind) {
        throw new Error('Could not find an endpoint target.');
    }

    for (let connection of graphData.connections) {
        const connectedEndpoint = connection.endpoints.find(
            (connectionEndpoint: any) => connectionEndpoint.id === endpointToFind.endpointId);

        if (!connectedEndpoint) {
            continue;
        }

        const nextNodeEndpoint = connection.endpoints.find(
            (connectionEndpoint: any) => connectionEndpoint.id !== endpointToFind.endpointId);

        for (let graphNode of graphData.nodes) {
            if (graphNode.inputEndpointId === nextNodeEndpoint.id) {
                return graphNode;
            }
        }

        throw new Error('Found a connection but could not match to a node.');
    }

    return null;
}