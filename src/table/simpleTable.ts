import * as d3 from 'd3';
import * as _ from 'lodash';

import 'materialize-css/dist/css/materialize.css';

interface StringMap {
    [key: string]: string | number;
}

const getHeadlines = (data: StringMap[]) => {
    const headlines: string[] = [];
    data.forEach(element => {
        _.keys(element).forEach(key => {
            if(headlines.indexOf(key) < 0) {
                headlines.push(key);
            }
        })
    })

    return headlines;
}

export const createTable = (selector: string, data: StringMap[]) => {
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

    const trbody = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");

    headlines.forEach(headline => {
        trbody.append("td").text(d => _.isUndefined(d[headline]) ? "" : d[headline]);
    })
}