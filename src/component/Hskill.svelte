<style>
    .skills{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .summary.skills{
        grid-template-columns: repeat(6, 1fr);
        gap: 8px;
    }
    .skill{
        min-width: 360px;
        min-height: 40px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 var(--border);
        box-sizing: border-box;
        cursor: pointer;
    }
    .summary .skill{
        min-width: auto;
    }
    .skill .highlight{
        min-width: 160px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .skill-text{
        width: 100%;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
    }
    .flex{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .title{
        padding: 8px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
    }
    .skill-info{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .skill-desc{
        word-break: break-all;
        white-space: pre-line;
    }
    .skill-title{
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .header{
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .btn{
        min-width: 24px;
        height: 24px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        fill: var(--highlight);
        stroke: var(--highlight);
        background: var(--btn-background);
        border: 1px solid var(--btn-border);
        cursor: pointer;
    }
    @media (max-width: 1630px) {
        .skill {
            justify-content: center;
        }
        .summary .skill{
            width: auto;
        }
    }
    @media (max-width: 720px) {
        .skills{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
        }
        .summary.skills {
            min-width: auto;
            grid-template-columns: repeat(4, 1fr);
        }
        .skill-text{
            flex-direction: column;
        }
    }
</style>
{#if parsedData.basic}
    <div class="flex">
        <div class="header">
            <div></div>
            <button class="btn" on:click={changeDisplayMode}>
                {#if itemOrderMode===1}
                    <ItemType1/>
                {:else}
                    <ItemType2/>
                {/if}
            </button>
        </div>
        <span class="highlight title">헥사스텟</span>
        <div class="skills">
            {#each stats as stat,i}
                <div class="skill">
                    <span class="highlight">
                        <span>{stat.main_stat_name}: </span><span class="green">{stat.main_stat_level}</span>
                    </span>
                    <span class="highlight">
                        <span>{stat.sub_stat_name_1}: </span><span class="green">{stat.sub_stat_level_1}</span>
                    </span>
                    <span class="highlight">
                        <span>{stat.sub_stat_name_2}: </span><span class="green">{stat.sub_stat_level_2}</span>
                    </span>
                </div>
            {/each}
        </div>
        <span class="highlight title">헥사스킬</span>
        <div class="skills" class:summary={itemOrderMode===0}>
            {#each skills as skill,i}
                {#if itemOrderMode===0}
                    <div class="skill" on:click={()=>clickItem(skill)}>
                    <span class="skill-text">
                        <div>
                            <img src="{skill.skill_icon}">
                        </div>
                        <span>
                            <span class="green">{skill.skill_level}</span>
                        </span>
                    </span>
                    </div>
                {:else}
                    <div class="skill" on:click={()=>clickItem(skill)}>
                    <span class="highlight skill-text">
                        <div>
                            <img src="{skill.skill_icon}">
                        </div>
                        <span>{skill.skill_name}</span>
                        <span>
                            <span class="green">{skill.skill_level}</span>
                        </span>
                    </span>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}
<Modal bind:modal={skillModal}>
    <span slot="header">스킬정보</span>
    <div slot="content">
        <div class="skill-info">
            <div class="skill-title">
                <img src="{selectedItem.skill_icon}">
            <span class="highlight">{selectedItem.skill_name} <span class="green">{selectedItem.skill_level}</span></span>
            </div>
            <div>
                <span class="skill-desc">{selectedItem.skill_effect}</span>
            </div>
            <div>
                <span class="skill-desc">{selectedItem.skill_description}</span>
            </div>
        </div>
    </div>
</Modal>
<script>
    import {nvl} from "../js/common";
    import Modal from "./Modal.svelte";
    import ItemType1 from "./icon/ItemType1.svelte";
    import ItemType2 from "./icon/ItemType2.svelte";

    export let parsedData;

    let skillModal;
    let skills = nvl(parsedData.hexamatrix.character_skill,[]);
    let stats = nvl(parsedData["hexamatrix-stat"].character_hexa_stat_core,[]);
    let selectedItem = {
        "skill_name": "",
        "skill_description": "",
        "skill_level": 0,
        "skill_effect": "",
        "skill_icon": ""
    };
    let itemOrderMode = 0;

    function clickItem(item){
        selectedItem = item;
        skillModal.show();
    }
    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }
</script>