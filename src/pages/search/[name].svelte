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
    @media (max-width: 1024px) {
        .info {
            flex-direction: column;
            align-items: center;
        }
    }
</style>
<div class="main">
    <Searchbar/>
    <div class="info">
        {#await data}
            <p>...Loading</p>
        {:then parsed_data}
            {#if parsed_data.basic}
                <div class="character">
                    <div class="grid-col-2">
                        <div class="character-img-wrapper">
                            <img class="character-img" src="{parsed_data.basic.character_image}">
                        </div>
                    </div>
                    <div>{parsed_data.basic.character_level}</div>
                    <div>{parsed_data.basic.character_name}</div>
                    <div>{parsed_data.basic.world_name}</div>
                    <div>{parsed_data.basic.character_class}</div>
                    <div>전투력</div>
                    <div>{input_int(parsed_stat['전투력'])}</div>
                    <div>스탯공격력</div>
                    <div>{input_int(parsed_stat['최대 스탯공격력'])}</div>
                    <div>HP</div>
                    <div>{input_int(parsed_stat['HP'])}</div>
                    <div>STR</div>
                    <div>{input_int(parsed_stat['STR'])}</div>
                    <div>DEX</div>
                    <div>{input_int(parsed_stat['DEX'])}</div>
                    <div>INT</div>
                    <div>{input_int(parsed_stat['INT'])}</div>
                    <div>LUK</div>
                    <div>{input_int(parsed_stat['LUK'])}</div>
                    <div>크리티컬 확률</div>
                    <div>{parsed_stat['크리티컬 확률']}%</div>
                    <div>보스 몬스터 데미지</div>
                    <div>{parsed_stat['보스 몬스터 데미지']}%</div>
                    <div>방어율 무시</div>
                    <div>{parsed_stat['방어율 무시']}%</div>
                    <div>크리티컬 데미지</div>
                    <div>{parsed_stat['크리티컬 데미지']}%</div>
                    <div>버프 지속시간</div>
                    <div>{parsed_stat['버프 지속시간']}%</div>
                    <div>재사용 대기시간 감소</div>
                    <div>{parsed_stat['재사용 대기시간 감소 (초)']}초 / {parsed_stat['재사용 대기시간 감소 (%)']}%</div>
                    <div>아이템 드롭률</div>
                    <div>{parsed_stat['아이템 드롭률']}%</div>
                    <div>메소 획득량</div>
                    <div>{parsed_stat['메소 획득량']}%</div>
                    <div>아케인포스</div>
                    <div>{input_int(parsed_stat['아케인포스'])}</div>
                    <div>어센틱포스</div>
                    <div>{input_int(parsed_stat['어센틱포스'])}</div>
                    <div class="ability">
                        <span class='{gradeMapper[parsed_data.ability.ability_grade]}'>{parsed_data.ability.ability_grade}
                            어빌리티</span>
                        <span>{parsed_data.ability.ability_info[0].ability_value}</span>
                        <span>{parsed_data.ability.ability_info[1].ability_value}</span>
                        <span>{parsed_data.ability.ability_info[2].ability_value}</span>
                    </div>
                    <div>무릉</div>
                    <div>{parsed_data.dojang.dojang_best_floor}층 ({parsed_data.dojang.dojang_best_time}초)</div>
                    <div>유니온</div>
                    <div>{parsed_data.union.union_level}</div>
                </div>
                <Equipment parsed_data="{parsed_data}" parsed_stat="{parsed_stat}" refresh="{refresh}"/>
            {/if}
        {:catch error}
            <p class="error">오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<script>
    import {params,afterPageLoad} from "@roxi/routify";
    import {get_idb, input_int, nvl, set_idb} from "../../js/common";
    import Searchbar from "../../component/Searchbar.svelte";
    import Equipment from "../../component/Equipment.svelte";

    let name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let data = init();
    let parsed_data = {}
    let parsed_stat = null;

    let gradeMapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }

    $:{
        console.log(parsed_data)
        parsed_stat = parse_stat();
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
                parsed_data = cache.data;
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
                parsed_data = data;
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

    function parse_stat(){
        let result = {};
        let stat = nvl(parsed_data.stat?.final_stat,[]);

        for(let i = 0; i < stat.length; i++){
            result[stat[i].stat_name] = stat[i].stat_value;
        }

        return result;
    }

    function refresh(){
        data = getDataFromServer();
    }

</script>
