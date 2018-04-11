export default interface NodeInterface {
    isEntry: boolean;
    title: string;
    outputs: string[];
    action: () => string;
}