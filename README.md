## some super simple utile
* showDataAsTable
```
<body>
<div id="root"></div>

<script>
    window.onload = function () {
        const data = [
            {a:1, b:2, c:3},
            {a:5, d:4, e:8},
            {b:1, c:4, e:9}
        ]

        window.showDataAsTable("#root", data);
    }
</script>
</body>
```