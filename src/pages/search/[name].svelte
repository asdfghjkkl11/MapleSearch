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
        align-items: start;
        gap: 8px;
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
    .grid-col-2{
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2 / auto;
    }
    .ability{
        grid-column: span 2 / auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .character-img-wrapper{
        width: 120px;
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .character-img{
        height: 120px;
    }
    .btn-area{
        width: 100%;
        padding: 8px;
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: var(--layer);
    }
    .btn{
        min-width: 64px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 500;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        color: var(--highlight);
        border: 1px solid var(--btn-border);
        cursor: pointer;
    }
    .btn span{
        padding: 0 8px;
    }
    .btn.active{
        background: var(--btn-background-active);
    }
    @media (max-width: 1024px) {
        .info {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
<div class="main">
    <Searchbar/>
    <div class="btn-area">
        {#each tabList as tab, i}
            <button class="btn" class:active={tabIndex === i} on:click={()=>{tabIndex = i}}>
                <span>{tab}</span>
            </button>
        {/each}
    </div>
    <div class="info">
        {#await data}
            <p>...Loading</p>
        {:then parsedData}
            {#if parsedData.basic}
                <div class="character">
                    <div class="grid-col-2">
                        <div class="character-img-wrapper">
                            <img class="character-img" src="{parsedData.basic.character_image}">
                        </div>
                    </div>
                    <div>{parsedData.basic.character_level}</div>
                    <div>{parsedData.basic.character_name}</div>
                    <div>{parsedData.basic.world_name}</div>
                    <div>{parsedData.basic.character_class}</div>
                    <div>전투력</div>
                    <div>{inputInt(parsedStat['전투력'])}</div>
                    <div>스탯공격력</div>
                    <div>{inputInt(parsedStat['최대 스탯공격력'])}</div>
                    <div>HP</div>
                    <div>{inputInt(parsedStat['HP'])}</div>
                    <div>STR</div>
                    <div>{inputInt(parsedStat['STR'])}</div>
                    <div>DEX</div>
                    <div>{inputInt(parsedStat['DEX'])}</div>
                    <div>INT</div>
                    <div>{inputInt(parsedStat['INT'])}</div>
                    <div>LUK</div>
                    <div>{inputInt(parsedStat['LUK'])}</div>
                    <div>크리티컬 확률</div>
                    <div>{parsedStat['크리티컬 확률']}%</div>
                    <div>보스 몬스터 데미지</div>
                    <div>{parsedStat['보스 몬스터 데미지']}%</div>
                    <div>방어율 무시</div>
                    <div>{parsedStat['방어율 무시']}%</div>
                    <div>크리티컬 데미지</div>
                    <div>{parsedStat['크리티컬 데미지']}%</div>
                    <div>버프 지속시간</div>
                    <div>{parsedStat['버프 지속시간']}%</div>
                    <div>재사용 대기시간 감소</div>
                    <div>{parsedStat['재사용 대기시간 감소 (초)']}초 / {parsedStat['재사용 대기시간 감소 (%)']}%</div>
                    <div>아이템 드롭률</div>
                    <div>{parsedStat['아이템 드롭률']}%</div>
                    <div>메소 획득량</div>
                    <div>{parsedStat['메소 획득량']}%</div>
                    <div>아케인포스</div>
                    <div>{inputInt(parsedStat['아케인포스'])}</div>
                    <div>어센틱포스</div>
                    <div>{inputInt(parsedStat['어센틱포스'])}</div>
                    <div class="ability">
                        <span class='{gradeMapper[parsedData.ability.ability_grade]}'>{parsedData.ability.ability_grade}
                            어빌리티</span>
                        <span>{parsedData.ability.ability_info[0].ability_value}</span>
                        <span>{parsedData.ability.ability_info[1].ability_value}</span>
                        <span>{parsedData.ability.ability_info[2].ability_value}</span>
                    </div>
                    <div>무릉</div>
                    <div>{parsedData.dojang.dojang_best_floor}층 ({parsedData.dojang.dojang_best_time}초)</div>
                    <div>유니온</div>
                    <div>
                        <span class="{cssList[unionIndex]}">{parsedData.union.union_level}</span>
                    </div>
                </div>
                {#if tabIndex === 0}
                    <Equipment parsedData="{parsedData}" parsedStat="{parsedStat}" refresh="{refresh}"/>
                {:else if tabIndex === 1}
                    <CashEquipment parsedData="{parsedData}" refresh="{refresh}"/>
                {:else if tabIndex === 2}
                    <Vcore parsedData="{parsedData}"/>
                {:else if tabIndex === 3}
                    <Hcore parsedData="{parsedData}"/>
                {:else if tabIndex === 4}
                    <Symbol parsedData="{parsedData}"/>
                {:else if tabIndex === 5}
                    <Union parsedData="{parsedData}"/>
                {:else}
                    <p class="error">준비중입니다.</p>
                {/if}
            {/if}
        {:catch error}
            <p class="error">오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<script>
    import {params,afterPageLoad} from "@roxi/routify";
    import {get_idb, inputInt, nvl, set_idb} from "../../js/common";
    import Searchbar from "../../component/Searchbar.svelte";
    import Equipment from "../../component/Equipment.svelte";
    import CashEquipment from "../../component/CashEquipment.svelte";
    import Vcore from "../../component/Vcore.svelte";
    import Hcore from "../../component/Hcore.svelte";
    import Symbol from "../../component/Symbol.svelte";
    import Union from "../../component/Union.svelte";

    let name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let data = init();
    let parsedData = {}
    let parsedStat = null;

    let gradeMapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }

    let gradeList = ["노비스","베테랑","마스터","그랜드 마스터","슈프림"];
    let cssList = ["novice","veteran","master","grand-master","supreme"];
    let unionIndex = 0;
    let tabList = ["장비","캐시장비","5차스킬","6차스킬","심볼","유니온"]
    let tabIndex = 0;

    $:{
        console.log(parsedData)
        parsedStat = parseStat();

        if(parsedData.union?.union_grade) {
            for (let i = 0; i < gradeList.length; i++) {
                if (parsedData.union.union_grade.includes(gradeList[i])) {
                    unionIndex = i;
                }
            }
        }
    }

    $afterPageLoad(async () => {
        name = decodeURIComponent($params.name);
        data = getData();
    });

    async function init(){
        return {};
    }

    async function getData(){
        let cache = await get_idb(name);
        if(cache){
            let time = new Date(cache.time).getDate();
            let now = new Date().getDate();

            if(time === now){
                parsedData = cache.data;
                return cache.data;
            }
        }
        return getDataFromServer();
    }

    async function getDataFromServer(){
        return fetch("https://mapleserver.asdfghjkkl11.com/maple/getInfo",{
            "method": "POST",
            "body": JSON.stringify({
                "ID": name
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();

            if(data.basic) {
                parsedData = data;
                await set_idb(name,{
                    data: data,
                    time: new Date().getTime()
                });
                return data;
            }else{
                throw new Error(data);
            }
        });
    }

    function parseStat(){
        let result = {};
        let stat = nvl(parsedData.stat?.final_stat,[]);

        for(let i = 0; i < stat.length; i++){
            result[stat[i].stat_name] = stat[i].stat_value;
        }

        return result;
    }

    function refresh(){
        data = getDataFromServer();
    }

</script>
