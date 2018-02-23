import { Component, ElementRef, OnInit } from "@angular/core";
import { D3Service, D3, HierarchyPointNode, HierarchyNode, TreeLayout } from "d3-ng2-service";

@Component({
    selector: 'app-tree-diagram',
    template: '<svg></svg>',
    styleUrls: ['./tree-diagram.component.css']
})
export class TreeDiagramComponent implements OnInit {
    parentNativeElement: any;

    data: any = {
        "name": "Top Level",
        "children": [
            {
                "name": "Level 2: A",
                "children": [
                    { "name": "Son of A" },
                    { "name": "Daughter of A" }
                ]
            },
            { 
                "name": "Level 2: B", 
                "children": [
                    { 
                        "name": "Son of B",
                        "children": [
                            { "name": "Son of B long text" },
                            { "name": "Daughter of B" }
                        ]
                    },
                    { "name": "Daughter of B" }
                ]
            }
        ]
    };

    private d3: D3;

    width: number = 1000;
    height : number = 500;

    constructor(element: ElementRef, d3Service: D3Service) {
        this.d3 = d3Service.getD3();
        this.parentNativeElement = element.nativeElement;
    }

    ngOnInit(): void {
        let d3 = this.d3;
        let treemap: TreeLayout<any> = d3.tree().size([this.height, this.width]);
        let nodes:HierarchyNode<any> = d3.hierarchy(this.data, d => d.children)

        let nodePoints:HierarchyPointNode<any> = treemap(nodes);

        let svg = d3.select("svg")
                    .attr("viewBox", `0 0 ${this.width} ${this.height}`)
                    .attr("preserveAspectRatio", "xMaxYMin meet");
        
        let g = svg.append("g").attr("transform", "scale(0.8) translate(100, 50)");
        let link = g.selectAll(".link").data(nodePoints.descendants().slice(1))
                    .enter().append("path").attr("class", "link")
                    .attr("d", d => {
                        return `M${d.y},${d.x}C${(d.y + d.parent.y)/2},${d.x} ${(d.y + d.parent.y)/2},${d.parent.x} ${d.parent.y},${d.parent.x}`
                    })
        
        let node = g.selectAll(".node")
                    .data(nodePoints.descendants())
                    .enter().append("g")
                    .attr("class", d => {
                        return "node" + (d.children ? " node--internal" : " node--leaf")
                    })
                    .attr("transform", d => {
                        return `translate(${d.y}, ${d.x})`
                    });
        
        node.append("circle").attr("r", 10);

        node.append("text").attr("dy", "-1.2em").attr("x", "0")
            .style("text-anchor", d=> {
                return "middle";
            })
            .text(d => { return d.data.name })
    }
}