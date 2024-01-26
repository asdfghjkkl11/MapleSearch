<style>
    .guilds{
        max-width: 90%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 4px;
    }
    .guild{
        min-width: 240px;
        width: fit-content;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        border-radius: 16px;
        box-shadow: inset -1px -1px 0 0 var(--border), -1px -1px 0 0 var(--border);
        box-sizing: border-box;
        cursor: pointer;
    }
    .guild-list{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    .guild-title{
        width: 88%;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0 -1px 0 0 var(--border);
    }
    .character-img-wrapper{
        width: 64px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .character-img{
        height: 64px;
    }
    .info{
        display: flex;
        flex-direction: column;
    }
    .btn-area{
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        gap: 16px;
    }
    .sort-list{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .btn{
        min-width: 64px;
        height: 24px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        color: var(--highlight);
        border: 1px solid var(--btn-border);
        cursor: pointer;
    }
    .icon{
        display: flex;
        align-items: center;
    }
    @media (max-width: 720px) {
    }
</style>
{#if parsedData.guild}
    <div class="btn-area">
        <div class="sort-list">
            <button class="btn" on:click={downloadCsv}>EXCEL</button>
        </div>
        <div class="sort-list">
            {#each sortColumns as columns,i}
                <button class="btn" data-index="{i}" on:click={changeOrderBy}>
                    <span>{columns}</span>
                    {#if sortOptions[i] === 1}
                        <div class="icon">
                            <ArrowDown/>
                        </div>
                    {:else if sortOptions[i] === 2}
                        <div class="icon">
                            <ArrowUp/>
                        </div>
                    {/if}
                </button>
            {/each}
        </div>
    </div>
    <div class="guild-list">
        <div class="guild-title">
            <span class="highlight">길드원 ({parsedMember.length}명)</span>
        </div>
        <div class="guilds">
            {#each parsedMember as member, i}
                <div class="guild" on:click={searchCharacter(member.character_name)}>
                    <div class="info">
                        <span><span class="highlight">{member.character_name}</span>&nbsp; LV: {member.character_level}</span>
                        <span>전투력: {nvl(parseIntText(member["전투력"]),0)}</span>
                        <span>무릉: {member.dojang_best_floor}층</span>
                    </div>
                    <div class="character-img-wrapper">
                        <img class="character-img" src="{member.character_image}">
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
<script>
    import {nvl, parseIntText} from "../js/common";
    import ArrowUp from "./icon/ArrowUp.svelte";
    import ArrowDown from "./icon/ArrowDown.svelte";
    import {goto} from "@roxi/routify";
    import ExcelJS from 'exceljs';

    export let parsedData;

    let parsedMember = null;
    let sortOptions = [0,0,0,0];
    let sortColumns = ["이름","레벨","전투력","무릉"];
    let orderOption = ["none","desc","asc"];

    $:{
        sortOptions = sortOptions;
        parsedMember = parseMember();
        parsedMember.sort(compare);
        console.log(parsedMember)
    }

    function parseMember(){
        let result = [];
        let memberList = nvl(parsedData.member_list, {});
        let keys = Object.keys(memberList);

        for(let i = 0; i < keys.length; i++){
            let key = keys[i];
            let member = memberList[key];
            if(member.basic) {
                let basic = member.basic;
                let stat = member.stat;
                let union = member.union;
                let dojang = member.dojang;
                let data = {
                    character_name: basic.character_name,
                    character_level: basic.character_level,
                    character_image: basic.character_image,
                    character_gender: basic.character_gender,
                    character_class: basic.character_class,
                    dojang_best_floor: dojang.dojang_best_floor,
                    dojang_best_time: dojang.dojang_best_time,
                    union_level: union.union_level,
                    artifact_level: union.artifact_level
                };

                let final_stat = nvl(stat?.final_stat,[]);

                for(let j = 0; j < final_stat.length; j++){
                    data[final_stat[j].stat_name] = final_stat[j].stat_value;
                }
                result.push(data);
            }
        }

        return result;
    }

    function changeOrderBy(){
        let index = this.dataset.index;
        let option = sortOptions[index];
        option++;
        if(option >= orderOption.length){
            option %= orderOption.length
        }
        sortOptions[index] = option;
    }

    function searchCharacter(character_name){
        $goto(`/search/${character_name}`);
    }

    function downloadCsv(){
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('시트 이름');
        let columns = [{
            header: "이름",
            key: "character_name"
        },{
            header: "레벨",
            key: "character_level"
        },{
            header: "직업",
            key: "character_class"
        },{
            header: "전투력",
            key: "전투력"
        },{
            header: "무릉층수",
            key: "dojang_best_floor"
        },{
            header: "무릉 클리어 시간",
            key: "dojang_best_time"
        },{
            header: "유니온 레벨",
            key: "union_level"
        },{
            header: "유니온 아티펙트 레벨",
            key: "artifact_level"
        }];

        worksheet.columns = columns;
        worksheet.insertRows(2, parsedMember);
        workbook.xlsx.writeBuffer().then(function (data) {
            let blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            let url = window.URL.createObjectURL(blob);
            let hiddenElement = document.createElement("a");

            hiddenElement.href = url
            hiddenElement.target = "_blank";
            hiddenElement.download = `${parsedData.guild.guild_name}.xlsx`;
            hiddenElement.click();
            hiddenElement.remove();
        });
    }

    function compare(a, b) {
        if(sortOptions[0] !== 0){
            let order = sortOptions[0];
            let A = a.character_name;
            let B = b.character_name;

            if (A > B) {
                return order === 1 ? -1 : 1;
            }
            if (A < B) {
                return order === 1 ? 1 : -1;
            }
        }
        if(sortOptions[1] !== 0){
            let order = sortOptions[1];
            let A = a.character_level;
            let B = b.character_level;

            if (A > B) {
                return order === 1 ? -1 : 1;
            }
            if (A < B) {
                return order === 1 ? 1 : -1;
            }
        }
        if(sortOptions[2] !== 0){
            let order = sortOptions[2];
            let A = Number(a["전투력"]);
            let B = Number(b["전투력"]);

            if (A > B) {
                return order === 1 ? -1 : 1;
            }
            if (A < B) {
                return order === 1 ? 1 : -1;
            }
        }
        if(sortOptions[3] !== 0){
            let order = sortOptions[3];
            let A = a.dojang_best_floor;
            let B = b.dojang_best_floor;

            if (A > B) {
                return order === 1 ? -1 : 1;
            }
            if (A < B) {
                return order === 1 ? 1 : -1;
            }
        }
    }
</script>