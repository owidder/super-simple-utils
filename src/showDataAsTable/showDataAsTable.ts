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

export const showDataAsTable = (selector: string, data: StringMap[], idAttributeName?: string, tableClass?: string) => {
    const headlines = getHeadlines(data);
    const root = d3.select(selector);

    const trhead = root
        .append("table")
        .attr("class", tableClass)
        .append("thead")
        .append("tr");

    // @ts-ignore (WebStorm thinks this is not correct, but it is)
    const headDataSelection = trhead.selectAll("th").data(headlines, d => d);

    headDataSelection
        .enter()
        .append("th")
        .text(d => d);

    headDataSelection.exit().remove();

    const tbody = root.select("table").append("tbody");

    const bodyDataSelection = tbody.selectAll("tr").data(data, idAttributeName ? d => d[idAttributeName] : undefined);

    const trbody = bodyDataSelection.enter().append("tr");

    headlines.forEach(headline => {
        trbody.append("td").text(d => d[headline] ? "" : d[headline]);
    });

    bodyDataSelection.exit().remove();
}

(window as any).showDataAsTable = showDataAsTable;
