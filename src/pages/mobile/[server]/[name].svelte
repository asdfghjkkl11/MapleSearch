<style>
    .main{
        width: 100%;
        min-width: 340px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: var(--text);
        box-sizing: border-box;
    }
    .info{
        display: flex;
        align-items: flex-start;
        gap: 16px;
    }
    .error{
        font-size: 24px;
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
        box-shadow: 1px 1px 0 0 var(--border),inset 1px 1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .date-area > *{
        flex-shrink: 0;
    }
    .character .flex{
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .search-area{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 16px;
    }
    .select{
        width: 132px;
        height: 40px;
        padding: 8px 24px 8px 16px;
        font-size: 16px;
        box-sizing: border-box;
        background: var(--layer);
        color: var(--highlight);
        border: none;
        box-shadow: 1px 1px 0 0 var(--border),inset 1px 1px 0 0 var(--border);
    }
    @media (max-width: 1024px) {
        .info {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
<div class="main">
    <div class="search-area">
        <Searchbar url="{url}"/>
        <select class="select" bind:value={selectedServer}>
            {#each mobileServerList as server,i}
                <option value="{server}">{server}</option>
            {/each}
        </select>
    </div>
    <div class="info">
        {#await data}
            <p>...Loading</p>
        {:then parsedData}
            {#if parsedData.basic}
                <div class="character">
                    <div>{parsedData.basic.character_level}</div>
                    <div>{parsedData.basic.character_name}</div>
                    <div class="flex">{parsedData.basic.world_name}
                        {#if worldMapper[parsedData.basic.world_name]}
                            <img class="world-icon" src="https://s3.ap-northeast-2.amazonaws.com/meso.gg/image/{worldMapper[parsedData.basic.world_name]}">
                        {/if}
                    </div>
                    <div>{parsedData.basic.character_job_name}</div>
                    <div>길드</div>
                    <div>{nvl(parsedData.guild.guild_name)}</div>
                    <div>전투력</div>
                    <div>{parseIntText(parsedStat['전투력'])}</div>
                    <div>HP</div>
                    <div>{inputInt(parsedStat['HP'])}</div>
                    <div>MP</div>
                    <div>{inputInt(parsedStat['MP'])}</div>
                    <div>물리 공격력</div>
                    <div>{inputInt(parsedStat['물리 공격력'])}</div>
                    <div>마법 공격력</div>
                    <div>{inputInt(parsedStat['마법 공격력'])}</div>
                    <div>물리 방어력</div>
                    <div>{inputInt(parsedStat['물리 방어력'])}</div>
                    <div>마법 방어력</div>
                    <div>{inputInt(parsedStat['마법 방어력'])}</div>
                </div>
                <MobileEquipment parsedData="{parsedData}"/>
            {/if}
        {:catch error}
            <p class="error">오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<script>
    import {params,afterPageLoad} from "@roxi/routify";
    import {g_loading_hide, g_loading_show, get_idb, inputInt, nvl, parseIntText, set_idb} from "../../../js/common";
    import Searchbar from "../../../component/Searchbar.svelte";
    import MobileEquipment from "../../../component/MobileEquipment.svelte";
    import {apiServer, mobileServerList, worldMapper} from "../../../js/mapper";

    let server = decodeURIComponent($params.server);
    let name = decodeURIComponent($params.name);
    let selectedServer = server;
    $: url = `/mobile/${selectedServer}`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let data = init();
    let parsedData = {}
    let parsedStat = null;

    $:{
        console.log(parsedData)
        parsedStat = parseStat();
    }

    $afterPageLoad(async () => {
        server = decodeURIComponent($params.server);
        name = decodeURIComponent($params.name);
        data = getData();
    });

    async function init(){
        return {};
    }

    async function getData(){
        try {
            g_loading_show();
            // let cache = await get_idb('searchM',`${server}_${name}`);
            // if(cache){
            //     if(searchDate === cache.date){
            //         parsedData = cache.data;
            //         return cache.data;
            //     }
            // }
            return getDataFromServer();
        }catch (e) {
            console.log(e)
        }finally {
            g_loading_hide();
        }
    }

    async function getDataFromServer(){
        return fetch(apiServer + "/maple/mobile/getInfo",{
            "method": "POST",
            "body": JSON.stringify({
                "ID": name,
                "server": server
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();

            if(data.basic) {
                parsedData = data;
                // await set_idb('searchM', `${server}_${name}`,{
                //     data: data,
                //     date: searchDate,
                //     name: name,
                //     server: server
                // });
                return data;
            }else{
                throw new Error(data);
            }
        });
    }

    function parseStat(){
        let result = {};
        let stat = nvl(parsedData.stat?.stat,[]);

        for(let i = 0; i < stat.length; i++){
            result[stat[i].stat_name] = stat[i].stat_value;
        }
        return result;
    }
</script>
