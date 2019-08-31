import * as d3 from 'd3';

interface StringMap {
    [key: string]: string | number;
}

const getHeadlines = (data: StringMap[]) => {
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

export const showDataAsTable = (selector: string, data: StringMap[], idAttributeName?: string) => {
    const headlines = getHeadlines(data);
    const root = d3.select(selector);

    const trhead = root
        .append("table")
        .attr("class", "responsive-table striped")
        .append("thead")
        .append("tr");

    trhead.selectAll("th")
        .data(headlines)
        .enter()
        .append("th")
        .text(d => d);

    const tbody = root.select("table").append("tbody");

    const dataSelection = tbody.selectAll("tr").data(data, idAttributeName ? d => d[idAttributeName] : undefined);

    const trbody = dataSelection.enter().append("tr");

    headlines.forEach(headline => {
        trbody.append("td").text(d => d[headline] ? "" : d[headline]);
    });

    dataSelection.exit().remove();
}

(window as any).showDataAsTable = showDataAsTable;
