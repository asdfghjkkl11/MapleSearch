<style>
</style>
<div>
    {#await data}
        <p>...Loading</p>
    {:then data}

        {JSON.stringify(data.data,null,4)}
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<script>
    import {params} from "@roxi/routify";

    const name = $params.name;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    $: data = fetch("https://mapleserver.asdfghjkkl11.com/maple/getCharacter",{
        "method": "POST",
        "body": JSON.stringify({
            "ID": name
        }),
        headers: myHeaders,
    }).then(response => response.json())
        .catch((error) => console.log(error));
</script>
