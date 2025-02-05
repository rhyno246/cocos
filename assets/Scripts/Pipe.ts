import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {
    @property({
        type : Node
    })
    public topPipe : Node;

    @property({
        type : Node
    })
    public bottomPipe : Node;
    public tempStartLocationUp = new Vec3(0,0,0);
    public tempStartLocationDown = new Vec3(0,0,0);

}


