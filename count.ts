import * as fs from 'fs';

function printCount(fileName: string) {
    const jsonFile = fs.readFileSync(`./${fileName}`, 'utf8');
    const jsonData = JSON.parse(jsonFile);

    const entries: { "connection": string, request: { url: string } }[] = jsonData.log.entries;
    const connectionUrlListMap = entries.reduce((pv, c, idx, arr) => {
        const urlList = pv.get(c.connection) ?? new Set<string>();
        pv.set(c.connection, urlList.add(c.request.url));
        return pv;
    }, new Map<string, Set<string>>());

    const resourceCount = Array.from(connectionUrlListMap.values()).reduce((p, c, idx, arr) => {
        return p + c.size;
    }, 0);

    console.info(`${fileName} => the number of connections: ${Array.from(connectionUrlListMap.keys()).length}. the number of resources: ${resourceCount}`);
}

[
    'www.naver.com.har',
    'computer.cnu.ac.kr.har',
    'www.ucdavis.edu.har',
    'us.france.fr.har',
    'www5.usp.br.har',
].forEach(v => printCount(v));