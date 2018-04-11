import NodeInterface from './nodeInterface';

class GraphData {
    public nodes: NodeDataMapItem[] = [];
    public connections: any = [];
}

class NodeDataMapItem {
    public inputEndpointId: string = '';
    public outputEndpoints: OutputEndpointIdentifier[] = [];

    constructor(public nodeType: NodeInterface) {
        this.nodeType = nodeType;
    }
}

class OutputEndpointIdentifier {
    constructor(public outputKey: string, public endpointId: string) {
        this.outputKey = outputKey;
        this.endpointId = endpointId;
    }
}

class Connection {
    constructor(public connectionId: string, public endpoints: string[]) {
        this.connectionId = connectionId;
        this.endpoints = endpoints;
    }
}

export { GraphData, NodeDataMapItem, OutputEndpointIdentifier, Connection }