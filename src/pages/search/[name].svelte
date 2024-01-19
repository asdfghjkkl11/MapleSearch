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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        grid-column: span 2 / auto;
    }
    .date-area{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .date-area > *{
        flex-shrink: 0;
    }
    .ability{
        grid-column: span 2 / auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .ability-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .preset-list{
        display: flex;
        align-items: center;
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
        flex-wrap: wrap;
        gap: 8px;
        background: var(--layer);
        z-index: 2;
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
    .preset-btn{
        width: 20px;
        height: 20px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        color: var(--highlight);
        border: 1px solid var(--btn-border);
        border-radius: 10px;
        cursor: pointer;
    }
    .preset-btn.active{
        background: var(--btn-background-active);
    }
    .profile-btn{
        padding: 4px 8px;
    }
    .character .flex{
        display: flex;
        align-items: center;
        gap: 4px;
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
                        <div class="date-area">
                            <span>검색기준: </span>
                            <DateInput
                                value="{date}"
                                format="yyyy-MM-dd"
                                placeholder="{date}"
                                closeOnSelection="{true}"
                                min="{minDate}"
                                max="{maxDate}"
                                on:select={selectDate}/>
                            <button class="btn profile-btn" on:click={makeProfile}>
                                프로필 만들기
                            </button>
                        </div>
                    </div>
                    <div>{parsedData.basic.character_level}</div>
                    <div>{parsedData.basic.character_name}</div>
                    <div class="flex">{parsedData.basic.world_name}
                        {#if worldMapper[parsedData.basic.world_name]}
                            <img class="world-icon" src="https://s3.ap-northeast-2.amazonaws.com/meso.gg/image/{worldMapper[parsedData.basic.world_name]}">
                        {/if}
                    </div>
                    <div>{parsedData.basic.character_class}</div>
                    <div>전투력</div>
                    <div>{parseIntText(parsedStat['전투력'])}</div>
                    <div>스탯공격력</div>
                    <div>{parseIntText(parsedStat['최대 스탯공격력'])}</div>
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
                        {#if abilityPreset}
                            <div class="ability-header">
                                <span class='{gradeMapper[parsedData.ability[`ability_preset_${abilityPreset}`].ability_preset_grade]}'>{parsedData.ability.ability_grade}
                                    어빌리티</span>
                                    <div class="preset-list">
                                        <button class="preset-btn" class:active={abilityPreset===1} on:click={()=>{abilityPreset=1}}>1</button>
                                        <button class="preset-btn" class:active={abilityPreset===2} on:click={()=>{abilityPreset=2}}>2</button>
                                        <button class="preset-btn" class:active={abilityPreset===3} on:click={()=>{abilityPreset=3}}>3</button>
                                    </div>
                            </div>
                            <span>{parsedData.ability[`ability_preset_${abilityPreset}`].ability_info[0].ability_value}</span>
                            <span>{parsedData.ability[`ability_preset_${abilityPreset}`].ability_info[1].ability_value}</span>
                            <span>{parsedData.ability[`ability_preset_${abilityPreset}`].ability_info[2].ability_value}</span>
                        {:else}
                            <span class='{gradeMapper[parsedData.ability.ability_grade]}'>{parsedData.ability.ability_grade}
                                어빌리티</span>
                            <span>{parsedData.ability.ability_info[0].ability_value}</span>
                            <span>{parsedData.ability.ability_info[1].ability_value}</span>
                            <span>{parsedData.ability.ability_info[2].ability_value}</span>
                        {/if}
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
                    <Lskill parsedData="{parsedData}"/>
                {:else if tabIndex === 3}
                    <Vskill parsedData="{parsedData}"/>
                {:else if tabIndex === 4}
                    <Hskill parsedData="{parsedData}"/>
                {:else if tabIndex === 5}
                    <Symbol parsedData="{parsedData}" parsedStat="{parsedStat}"/>
                {:else if tabIndex === 6}
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
    import {g_loading_hide, g_loading_show, get_idb, inputInt, nvl, parseIntText, set_idb} from "../../js/common";
    import Searchbar from "../../component/Searchbar.svelte";
    import Equipment from "../../component/Equipment.svelte";
    import CashEquipment from "../../component/CashEquipment.svelte";
    import Lskill from "../../component/Lskill.svelte";
    import Vskill from "../../component/Vskill.svelte";
    import Hskill from "../../component/Hskill.svelte";
    import Symbol from "../../component/Symbol.svelte";
    import Union from "../../component/Union.svelte";
    import dayjs from "dayjs";
    import DateInput from "../../component/datePicker/DateInput.svelte";

    let name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let data = init();
    let parsedData = {}
    let parsedStat = null;
    let searchDate = dayjs().subtract(1,"day").format("YYYY-MM-DD");
    let date = dayjs().subtract(1,"day").toDate();
    let minDate = dayjs("2023-12-21").toDate();
    let maxDate = dayjs().subtract(1,"day").toDate();

    let gradeMapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }

    let gradeList = ["노비스","베테랑","마스터","그랜드 마스터","슈프림"];
    let cssList = ["novice","veteran","master","grand-master","supreme"];
    let unionIndex = 0;
    let tabList = ["장비","캐시장비","링크스킬","5차스킬","6차스킬","심볼","유니온"]
    let tabIndex = 0;
    let worldMapper = {
        "리부트": "icon_3.png",
        "리부트2": "icon_2.png",
        "오로라": "icon_4.png",
        "레드": "icon_5.png",
        "이노시스": "icon_6.png",
        "유니온": "icon_7.png",
        "스카니아": "icon_8.png",
        "루나": "icon_9.png",
        "제니스": "icon_10.png",
        "크로아": "icon_11.png",
        "베라": "icon_12.png",
        "엘리시움": "icon_13.png",
        "아케인": "icon_14.png",
        "노바": "icon_15.png",
        "버닝": "icon_16.png",
        "버닝2": "icon_17.png",
        "버닝3": "icon_18.png",
        "버닝4": "icon_19.png"
    }
    let abilityPreset = null;
    $:{
        console.log(parsedData)
        console.log(abilityPreset)
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

    function selectDate(e){
        date = e.detail;
        searchDate = dayjs(date).format("YYYY-MM-DD");
        data = getData();
    }

    async function getData(){
        try {
            g_loading_show();
            let cache = await get_idb('search',`${name}`);
            if(cache){
                if(searchDate === cache.date){
                    parsedData = cache.data;
                    abilityPreset = parsedData.ability.preset_no;
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
        return fetch("https://mapleserver.asdfghjkkl11.com/maple/getInfo",{
            "method": "POST",
            "body": JSON.stringify({
                "ID": name,
                "date": searchDate
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();

            if(data.basic) {
                parsedData = data;
                abilityPreset = parsedData.ability.preset_no;
                await set_idb('search', `${name}`,{
                    data: data,
                    date: searchDate,
                    name: name
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
        try {
            g_loading_show();
            data = getDataFromServer();
        }catch (e) {
            console.log(e)
        }finally {
            g_loading_hide();
        }
    }

    async function makeProfile(){
        try {
            g_loading_show();
            let character = parsedData.basic;
            let equipment = nvl(parsedData["item-equipment"].item_equipment,[]);
            let symbols = nvl(parsedData["symbol-equipment"].symbol,[]);
            let skills = nvl(parsedData.hexamatrix.character_skill,[]);
            let theme = document.body.dataset.theme;
            let canvas = document.createElement('canvas');

            let height = parseInt(skills.length/15) * 60;
            canvas.width = 620;
            canvas.height = 310 + height;

            let context = canvas.getContext("2d");
            context.strokeStyle = (theme==="dark-mode")?"#141517":"#fefefe";
            context.fillStyle = (theme==="dark-mode")?"#141517":"#fefefe";
            context.beginPath();
            context.roundRect(0, 0, canvas.width, canvas.height, 24);
            context.stroke();
            context.fill();

            document.body.appendChild(canvas);
            let characterImage = await getImage(character.character_image);
            await addImage(characterImage,30,30);

            let worldIcon = await getImage(`https://s3.ap-northeast-2.amazonaws.com/meso.gg/image/${worldMapper[parsedData.basic.world_name]}`);
            await addImage(worldIcon, 140, 17);

            context = canvas.getContext("2d");
            context.strokeStyle = (theme==="dark-mode")?"#ffffff":"#141517";
            context.fillStyle = (theme==="dark-mode")?"#ffffff":"#141517";
            context.font = "16px Pretendard bold";
            context.fillText(`${parsedData.basic.world_name}`, 156, 30);
            context.fillText(`${parsedData.basic.character_name}`, 140, 50);
            context.fillText(`level: ${parsedData.basic.character_level}`, 140, 70);
            context.fillText(`${parsedData.basic.character_class}`, 140, 90);
            context.fillText(`유니온: ${parsedData.union.union_level}`, 140, 110);
            context.fillText(`무릉: ${parsedData.dojang.dojang_best_floor}층 (${parsedData.dojang.dojang_best_time}초)`, 140, 130);

            context.fillText(`전투력:`, 300, 30);
            context.fillText(`스공:`, 300, 50);
            context.fillText(`보공:`, 300, 70);
            context.fillText(`방무:`, 300, 90);
            context.fillText(`크뎀:`, 300, 110);
            context.fillText(`벞지:`, 300, 130);
            context.fillText(`재사용:`, 300, 150);
            context.fillText(`${parseIntText(parsedStat['전투력']).slice(0, -4)}`, 357, 30);
            context.fillText(`${parseIntText(parsedStat['최대 스탯공격력']).slice(0, -4)}`, 357, 50);
            context.fillText(`${parsedStat['보스 몬스터 데미지']}%`, 357, 70);
            context.fillText(`${parsedStat['방어율 무시']}%`, 357, 90);
            context.fillText(`${parsedStat['크리티컬 데미지']}%`, 357, 110);
            context.fillText(`${parsedStat['버프 지속시간']}%`, 357, 130);
            context.fillText(`${parsedStat['재사용 대기시간 감소 (초)']}초 / ${parsedStat['재사용 대기시간 감소 (%)']}%`, 357, 150);

            context.fillText(`HP:`, 470, 30);
            context.fillText(`STR:`, 470, 50);
            context.fillText(`DEX:`, 470, 70);
            context.fillText(`INT:`, 470, 90);
            context.fillText(`LUK:`, 470, 110);
            context.fillText(`아케인포스:`, 470, 130);
            context.fillText(`어센틱포스:`, 470, 150);
            context.fillText(`${inputInt(parsedStat['HP'])}`, 507, 30);
            context.fillText(`${inputInt(parsedStat['STR'])}`, 507, 50);
            context.fillText(`${inputInt(parsedStat['DEX'])}`, 507, 70);
            context.fillText(`${inputInt(parsedStat['INT'])} `, 507, 90);
            context.fillText(`${inputInt(parsedStat['LUK'])}`, 507, 110);
            context.fillText(`${inputInt(parsedStat['아케인포스'])}`, 557, 130);
            context.fillText(`${inputInt(parsedStat['어센틱포스'])}`, 557, 150);

            context.fillText(`기준날짜: ${dayjs(date).format("YYYY-MM-DD")}`, canvas.width - 170,  canvas.height - 20);

            context.strokeStyle = (theme==="dark-mode")?"rgba(0,255,163,.9)":"#141517";
            context.fillStyle = (theme==="dark-mode")?"rgba(0,255,163,.9)":"#141517";

            for(let i = 0; i < symbols.length; i++){
                let symbol = symbols[i]
                let symbolIcon = await getImage(`${symbol.symbol_icon}`);
                await addImage(symbolIcon, 15 + (40*i), 160);
                let textWidth =  23 + (40*i) + ((symbol.symbol_level<10)?7:0);
                context.fillText(`${symbol.symbol_level}`,textWidth, 210);
            }
            let dX = 0;
            let dY = 0;
            for(let i = 0; i < skills.length; i++){
                let skill = skills[i]
                let skillIcon = await getImage(`${skill.skill_icon}`);
                await addImage(skillIcon, 15 + (40*dX), 220 + (60*dY));
                let textWidth =  20 + (40*dX) + ((skill.skill_level<10)?7:0);
                context.fillText(`${skill.skill_level}`,textWidth, 270 + (60*dY));
                dX++;
                if(15 + (40*dX) > 600){
                    dX = 0;
                    dY++;
                }
            }
            let gradeObj = {
                "레어": 0,
                "에픽": 0,
                "유니크": 0,
                "레전드리": 0,
            }
            let totalSize = 0;
            for(let i = 0; i < equipment.length; i++){
                if(equipment[i].potential_option_grade){
                    gradeObj[equipment[i].potential_option_grade]++;
                    totalSize++;
                }
                if(equipment[i].additional_potential_option_grade) {
                    gradeObj[equipment[i].additional_potential_option_grade]++;
                    totalSize++;
                }
            }
            let startX = 24;
            let startY = canvas.height -5;
            let endX = startX + ((canvas.width-48) * gradeObj["레전드리"] / totalSize);
            let endY = canvas.height;

            if(startX !== endX) {
                context.strokeStyle = (theme === "dark-mode") ? "rgba(0,255,163,.9)" : "#02d05d";
                context.fillStyle = (theme === "dark-mode") ? "rgba(0,255,163,.9)" : "#02d05d";
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, startY);
                context.lineTo(endX, endY);
                context.lineTo(startX, endY);
                context.stroke();
                context.fill();
            }

            startX = endX;
            endX = startX + ((canvas.width-48) * gradeObj["유니크"] / totalSize);
            if(startX !== endX) {
                context.strokeStyle = (theme === "dark-mode") ? "#e4ce00" : "#ffc000";
                context.fillStyle = (theme === "dark-mode") ? "#e4ce00" : "#ffc000";
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, startY);
                context.lineTo(endX, endY);
                context.lineTo(startX, endY);
                context.stroke();
                context.fill();
            }

            startX = endX;
            endX = startX + ((canvas.width-48) * gradeObj["에픽"] / totalSize);
            if(startX !== endX) {
                context.strokeStyle = (theme === "dark-mode") ? "#7b53e2" : "#e198ff";
                context.fillStyle = (theme === "dark-mode") ? "#7b53e2" : "#e198ff";
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, startY);
                context.lineTo(endX, endY);
                context.lineTo(startX, endY);
                context.stroke();
                context.fill();
            }

            startX = endX;
            endX = startX + ((canvas.width-48) * gradeObj["레어"] / totalSize);
            if(startX !== endX) {
                context.strokeStyle = (theme === "dark-mode") ? "#81c3d7" : "#0095ff";
                context.fillStyle = (theme === "dark-mode") ? "#81c3d7" : "#0095ff";
                context.beginPath();
                context.moveTo(startX, startY);
                context.lineTo(endX, startY);
                context.lineTo(endX, endY);
                context.lineTo(startX, endY);
                context.stroke();
                context.fill();
            }

            const img = canvas.toDataURL('image/png')
            download(`${parsedData.basic.character_name}_${dayjs(date).format("YYYY-MM-DD")}.png`,img);
            document.body.removeChild(canvas);

            async function getImage(src){
                let cache = await get_idb('url',src);
                if(cache){
                    return cache;
                }
                let url = await (await fetch("https://mapleserver.asdfghjkkl11.com/maple/getUrl", {
                    "method": "POST",
                    "body": JSON.stringify({
                        "url": src
                    }),
                    headers: myHeaders,
                })).text();
                await set_idb("url",src,url);
                return url;
            }
            function addImage(src,x,y,width,height){
                return new Promise((resolve, reject) => {
                    let img = new Image()
                    if(width)
                        img.width = width;
                    if(height)
                        img.height = height;
                    img.crossOrigin = 'Anonymous';
                    img.onload = function(){
                        let context = canvas.getContext('2d');
                        context.drawImage(img,x,y);
                        resolve();
                    }
                    img.onerror = reject
                    img.src = src
                })
            }

            function download(filename, filepath) {
                let element = document.createElement('a');
                element.setAttribute('href',filepath);
                element.setAttribute('download', filename);
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
            }
        }catch (e) {
            console.log(e)
        }finally {
            g_loading_hide();
        }
    }
</script>
