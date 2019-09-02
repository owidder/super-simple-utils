import * as d3 from 'd3';

interface StringMap {
    [key: string]: string | number;
}

const getHeadlines = (data: StringMap[]): string[] => {
    const headlines: string[] = [];
    data.forEach(element => {
        Object.keys(element).forEach(key => {
            if(headlines.indexOf(key) < 0) {
                headlines.push(key);
            }
        })
    })

    return headlines;
}

type Selection = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

const createTableWithHeadRowAndBody = (root: Selection, tableClass: string): void => {
    const table = root.selectAll("table")
        .data([1])
        .enter()
        .append("table")
        .attr("class", tableClass);
    table.append("thead")
        .append("tr");
    table.append("tbody");
}

const createHeadRowData = (root: Selection, headlines: string[]): void => {
    // @ts-ignore (WebStorm thinks this is not correct, but it is)
    const headDataSelection = root.select("table thead tr").selectAll("th").data(headlines, d => d)

    headDataSelection
        .enter()
        .append("th")
        .text(d => d)

    headDataSelection.exit().remove()
}

const createTableBodyRows = (root: Selection, data: StringMap[], idAttributeName?: string): void => {
    const bodyDataSelection = root.select("table tbody").selectAll("tr")
        .data(data, idAttributeName ? d => d[idAttributeName] : undefined)

    const trbody = bodyDataSelection.enter().append("tr")

    bodyDataSelection.exit().remove()
}

const createTableBodyData = (root: Selection, headlines: string[]): void => {
    const tableBodyDataSelection = root.selectAll("table tbody tr").selectAll("td")
        .data(d => headlines.map(headline => d[headline]), (_d, i) => headlines[i])

    tableBodyDataSelection.enter()
        .append("td")
        .merge(tableBodyDataSelection)
        .text(d => d)

    tableBodyDataSelection.exit().remove()
}

export const showDataAsTable = (selector: string, data: StringMap[], idAttributeName?: string, tableClass?: string) => {
    const headlines = getHeadlines(data);
    const root = d3.select(selector);

    createTableWithHeadRowAndBody(root, tableClass);
    createHeadRowData(root, headlines);
    createTableBodyRows(root, data, idAttributeName);
    createTableBodyData(root, headlines);
}

(window as any).showDataAsTable = showDataAsTable;
