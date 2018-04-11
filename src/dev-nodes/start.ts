import NodeInterface from '../nodeInterface';

export default class StartNode implements NodeInterface {
    isEntry: boolean = true;

    title: string = 'Start Node';

    outputs: string[] = ['1', '2'];

    action: () => string = () => {
        console.log('Start');
        return '1';
    };
}