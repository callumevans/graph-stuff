import NodeInterface from '../nodeInterface';

export default class MiddleNode implements NodeInterface {
    isEntry: boolean = false;

    title: string = 'Middle Node';

    outputs: string[] = ['1', '2'];

    action: () => string = () => {
        console.log('Middle');
        return '1';
    };
}