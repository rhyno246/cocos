import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { Pipe } from './Pipe';

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type : Prefab
    })

    public prefabPipe = null



    initPool () {

    }

    addPool(){

    }

    reset(){

    }
}


