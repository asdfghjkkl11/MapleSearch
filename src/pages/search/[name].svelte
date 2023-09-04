<style>
    .main{
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: white;
        overflow-x: hidden;
        overflow-y: scroll;
        box-sizing: border-box;
    }
    .character{
        display: grid;
        grid-template-columns: 1fr 1fr;
        flex-direction: column;
        font-size: 14px;
    }
    .character > div{
        min-width: 140px;
        padding: 4px 8px;
        box-shadow: 1px 1px 0 0 #eeeeee,inset 1px 1px 0 0 #eeeeee;
        box-sizing: border-box;
    }
    .items{
        display: grid;
        grid-template-columns: 1fr;
    }
    .cashitems{
        display: flex;
        flex-direction: column;
    }
    .grid-col-2{
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2 / auto;
    }
    .character-img-wrapper{
        width: 120px;
        height: 120px;
        position: relative;
        overflow: hidden;
    }
    .character-img{
        width: 240px;
        height: 240px;
        position: absolute;
        top: -80px;
        left: -50px;
    }
    .item{
        padding: 4px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 #cdcdcd;
    }
    .item > div{
        flex-shrink: 0;
    }
    .item-img-wrapper{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-img{
        max-width: 32px;
    }
    .item-main-cube, .item-additional-cube{
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }
    .item-name{
        width: 240px;
    }
    .item-cls{
        width: 48px;
    }
    .cube{
        min-width: 80px;
    }
    .blue{
        color: #99e6fe;
    }
    .purple{
        color: #e198ff;
    }
    .yellow{
        color: #ffdf00;
    }
    .green{
        color: lime;
    }
    @media (max-width: 1200px) {
        .main {
            height: calc(100vh - 112px);
        }
    }
</style>
<div class="main">
    <Searchbar/>
    {#await data}
        <p>...Loading</p>
    {:then data}
        <div class="character">
            {#if character}
                {#if character.name !== ""}
                    <div class="grid-col-2">
                        <div class="character-img-wrapper">
                            <img class="character-img" src="{character.image}">
                        </div>
                    </div>
                    <div>{character.level}</div>
                    <div>{character.name}</div>
                    <div>{character["월드"]}</div>
                    <div>{character["직업"]}</div>
                    <div>스탯공격력</div>
                    <div>{character["스탯공격력"][1]}</div>
                    <div>STR</div>
                    <div>{character["STR"]}</div>
                    <div>DEX</div>
                    <div>{character["DEX"]}</div>
                    <div>INT</div>
                    <div>{character["INT"]}</div>
                    <div>LUK</div>
                    <div>{character["LUK"]}</div>
                    <div>보스공격력</div>
                    <div>{character["보스공격력"]}</div>
                    <div>방어율무시</div>
                    <div>{character["방어율무시"]}</div>
                    <div>크리티컬 데미지</div>
                    <div>{character["크리티컬 데미지"]}</div>
                {/if}
            {/if}
        </div>
        <div class="items">
            {#each items as item, i}
                <div class="item" style="order: {itemOrder[i]}">
                    <div class="item-img-wrapper">
                        <img class="item-img" src="{item.image}">
                    </div>
                    <div class="item-name">{item.name}</div>
                    <div class="item-cls">{calculate_option(item,main)}</div>
                    <div class="item-cube">
                        {#if item["잠재옵션"]}
                            {#if item["잠재옵션"]["grade"] !== ""}
                                <div class="item-main-cube">
                                    <div class='{grade_mapper[item["잠재옵션"]["grade"]]}'>잠재</div>
                                    {#each item["잠재옵션"]["option"] as option, j}
                                        <div class='cube {grade_mapper[item["잠재옵션"]["grade"]]}'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                        {#if item["에디셔널 잠재옵션"]}
                            {#if item["에디셔널 잠재옵션"]["grade"] !== ""}
                                <div class="item-additional-cube">
                                    <div class='{grade_mapper[item["에디셔널 잠재옵션"]["grade"]]}'>에디</div>
                                    {#each item["에디셔널 잠재옵션"]["option"] as option, j}
                                        <div class='cube {grade_mapper[item["에디셔널 잠재옵션"]["grade"]]}'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                                    {/each}
                                </div>
                            {/if}
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div class="cashitem">
        </div>
    {:catch error}
        <p>오류가 발생했습니다.</p>
    {/await}
</div>
<script>
    import {params} from "@roxi/routify";
    import {calculate_option, get_idb, nvl, option_parse, set_idb, uc} from "../../js/common";
    import Searchbar from "../../component/Searchbar.svelte";

    const name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let character = {};
    let items = [];
    let cashItems = [];
    let itemOrder = [20,4,1,19,16,14,22,18,15,13,12,23,17,2,5,7,3,21,11,6,8,9,10,24,25];
    let main = "STR";
    let grade_mapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }
    $: data = get_data();

    $:{
        if(character){
            if(character.name !== ""){
                let str = uc(character["STR"]);
                let dex = uc(character["DEX"]);
                let int = uc(character["INT"]);
                let luk = uc(character["LUK"]);
                let max = Math.max(str,dex,int,luk);

                if(max == str){
                    main = "STR";
                }else if(max == dex){
                    main = "DEX";
                }else if(max == int){
                    main = "INT";
                }else if(max == luk){
                    main = "LUK";
                }
            }
        }

        if(items) {
            for (let i = 0; i < items.length; i++) {
                let a = items[i]["잠재옵션"];
                let b = items[i]["에디셔널 잠재옵션"];

                if (a) {
                    if (a["grade"] !== "") {
                        for (let j = 0; j < a["option"].length; j++) {
                            a["option"][j] = option_parse(a["option"][j]);
                        }
                    }
                }
                if (b) {
                    if (b["grade"] !== "") {
                        for (let j = 0; j < b["option"].length; j++) {
                            b["option"][j] = option_parse(b["option"][j]);
                        }
                    }
                }
            }
        }
    }

    async function get_data(){
        let cache = await get_idb(name);
        if(cache){
            let time = new Date().getTime() - cache.time;
            if(time < 300000){
                character = cache.data.character;
                items = cache.data.items;
                cashItems = cache.data.cashItems;
                return "";
            }
        }
        return fetch("https://mapleserver.asdfghjkkl11.com/maple/getCharacter",{
            "method": "POST",
            "body": JSON.stringify({
                "ID": name
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();
            if(data.resultCode === "success") {
                character = data.data.character;
                items = data.data.items;
                cashItems = data.data.cashItems;
                await set_idb(name,{
                    data: data.data,
                    time: new Date().getTime()
                });
            }else{
                throw new Error(data.error.message);
            }
        });
    }
</script>
