## just some utils (super simple)

### showDataAsTable
* `showDataAsTable(cssSelector: string, 
    dataArray: {[key: string]: string | number}, 
    nameOfIdAttribute?: string, 
    cssClassesForTable?: string)`

```
<body>
<div id="root"></div>

<script>
    window.onload = function () {
        const data1 = [
            {nr:1, a:1, b:2, c:3},
            {nr:2, a:5, d:4, e:8},
            {nr:3, b:1, c:4, e:9},
        ]

        window.showDataAsTable("#root", data1, "nr");

        setTimeout(() => {
            const data2 = [
                {nr:1, a:1, b:2, c:3},
                {nr:3, b:1, c:4, f:10},
                {nr:4, b:1, f:11, c:5},
            ]

            window.showDataAsTable("#root", data2, "nr");
        }, 2000)
    }
</script>
</body>
```

### hashSHA256
* `hashSHA256(text: string): string`

`const abcHashed = hashSHA256("abc")`