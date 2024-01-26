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
        flex-direction: column;
        align-items: center;
        gap: 16px;
    }
    .error{
        font-size: 24px;
    }
    .guild{
        display: grid;
        grid-template-columns: 1fr 1fr;
        flex-direction: column;
        font-size: 14px;
    }
    .guild > div{
        min-width: 140px;
        padding: 4px 8px;
        box-shadow: 1px 1px 0 0 var(--border),inset 1px 1px 0 0 var(--border);
        box-sizing: border-box;
    }
    .grid-col-2{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-column: span 2 / auto;
    }
    .character-img-wrapper{
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .character-img{
        height: 80px;
    }
    .guild-img{
        height: 24px;
    }
    .date-area > *{
        flex-shrink: 0;
    }
    .guild .flex{
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
            {#each pcServerList as server,i}
                <option value="{server}">{server}</option>
            {/each}
        </select>
    </div>
    <div class="info">
        {#await data}
            <p>...Loading</p>
        {:then parsedData}
            {#if parsedData.guild}
                <div class="guild">
                    <div class="flex highlight">
                        <img class="guild-img" src="data:image/png;base64,{parsedData.guild.guild_mark_custom}">
                        <span>{parsedData.guild.guild_name}</span>
                        <span>LV{parsedData.guild.guild_level}</span>
                    </div>
                    <div class="flex highlight">
                        <span>{parsedData.guild.world_name}</span>
                        {#if worldMapper[parsedData.guild.world_name]}
                            <img class="world-icon" src="https://s3.ap-northeast-2.amazonaws.com/meso.gg/image/{worldMapper[parsedData.guild.world_name]}">
                        {/if}
                    </div>
                    <div class="grid-col-2">
                        <div>길드장</div>
                        <div class="character-img-wrapper">
                            <img class="character-img" src="{parsedData.member_list[parsedData.guild.guild_master_name].basic.character_image}">
                        </div>
                        <div class="flex">
                            <span>{parsedData.guild.guild_master_name}</span>
                            <span>LV{parsedData.member_list[parsedData.guild.guild_master_name].basic.character_level}</span>
                        </div>
                    </div>
                    <div class="grid-col-2">
                        <div class="date-area flex">
                            <span>검색기준: </span>
                            <DateInput
                                    value="{date}"
                                    format="yyyy-MM-dd"
                                    placeholder="{date}"
                                    closeOnSelection="{true}"
                                    min="{minDate}"
                                    max="{maxDate}"
                                    on:select={selectDate}/>
                        </div>
                    </div>
                </div>
                <GuildMember parsedData="{parsedData}"/>
            {/if}
        {:catch error}
            {console.log(error)}
            <p class="error">오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<script>
    import {params,afterPageLoad} from "@roxi/routify";
    import {g_loading_hide, g_loading_show, get_idb, inputInt, nvl, parseIntText, set_idb} from "../../../js/common";
    import Searchbar from "../../../component/Searchbar.svelte";
    import {apiServer, pcServerList, worldMapper} from "../../../js/mapper";
    import dayjs from "dayjs";
    import {DateInput} from "../../../component/datePicker";
    import GuildMember from "../../../component/GuildMember.svelte";

    let server = decodeURIComponent($params.server);
    let name = decodeURIComponent($params.name);
    let selectedServer = server;
    $: url = `/guild/${selectedServer}`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let data = init();
    let parsedData = {}
    let parsedStat = null;
    let searchDate = dayjs().subtract(1,"day").format("YYYY-MM-DD");
    let date = dayjs().subtract(1,"day").toDate();
    let minDate = dayjs("2023-12-21").toDate();
    let maxDate = dayjs().subtract(1,"day").toDate();

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
            let cache = await get_idb('guild',`${server}_${name}`);
            if(cache){
                if(searchDate === cache.date){
                    parsedData = cache.data;
                    return cache.data;
                }
            }
            return getDataFromServer();
        }catch (e) {
            console.log(e)
        }finally {
            g_loading_hide();
        }
    }

    async function getDataFromServer(){
        return fetch(apiServer + "/maple/getGuildInfo",{
            "method": "POST",
            "body": JSON.stringify({
                "guild": name,
                "server": server,
                "date": searchDate
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();

            if(data.guild) {
                parsedData = data;
                await set_idb('guild', `${server}_${name}`,{
                    data: data,
                    date: searchDate,
                    name: name,
                    server: server
                });
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

    function selectDate(e){
        date = e.detail;
        searchDate = dayjs(date).format("YYYY-MM-DD");
        data = getData();
    }
</script>
