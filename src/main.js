import data from './routes.data';

const Node = (function(){


    function Node(name){
        this.name = name;
        /** @var Node[] */
        this.childs = [];
        this.priceList = {};
    }

    Node.prototype.findChild = function(nodeName){
        return this.childs.find(function(node){
            if(node.name === nodeName){
                return node;
            }
            return null;
        })
    };

    Node.prototype.getPriceToChild = function(nodeName){
        let childNode = this.findChild(nodeName);
        if(!childNode)
            return -1;
        return this.priceList[childNode.name];
    };

    Node.prototype.addChild = function(node, price){
        this.childs.push(node);
        this.priceList[node.name] = parseInt(price);
    };

    return Node;

})();

const Tree = (function(){

    function Tree(data){
        /** @var Node[] */
        this.nodes = [];

        this.processData(data);
    }

    Tree.prototype.processData = function(data){
        let self = this;
        data.forEach(function(el){
            self.addDist(el.from, el.to, el.price);
        });
    };

    Tree.prototype.findNode = function(nodeName){
        return this.nodes.find(function(node){
            if(node.name === nodeName){
                return node;
            }
            return null;
        })
    };

    Tree.prototype.addDist = function(from, to, price){
        let node = this.findNode(from);
        if(!node){
            node = new Node(from);
            this.nodes.push(node);
        }

        let childNode = this.findNode(to);
        if(!childNode){
            childNode = new Node(to);
            this.nodes.push(childNode);
        }

        node.addChild(childNode, price);


    };

    /**
     * Use to solve case 1
     * return -1 if path dosn't exists
     * @param path - "A-B-C"
     * @returns {number}
     */
    Tree.prototype.getPriceOfPath = function(path){
        let self = this;
        let points = path.split("-");
        let totalPrice = 0;

        let N = points.length - 1;
        for(let i = 0; i < N; i ++){
            let fromPoint = points[i];
            let toPoint   = points[i + 1];

            let node = self.findNode(fromPoint);
            if(!node){
                // Path dosn't exists
                totalPrice = -1;
                break;
            }
            let price = node.getPriceToChild(toPoint);
            if(price === -1){
                // Path dosn't exists
                totalPrice = -1;
                break;
            }

            totalPrice += price;

        }

        return totalPrice;

    };

    return Tree;
})();


let myTree = new Tree (data);


let testCaseOne = [
    "A-B-C", "D-A-B", "A-B-C-D", "A-D"
];

const Main = testCaseOne.forEach(function(test){
    console.log(test + " : " +  myTree.getPriceOfPath(test));
});

export default Main;