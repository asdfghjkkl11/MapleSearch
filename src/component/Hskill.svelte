<style>
    .skills{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
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
    .skill .highlight{
        min-width: 160px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .skill > div{
        flex-shrink: 0;
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
    @media (max-width: 1630px) {
        .skill {
            width: 360px;
            justify-content: center;
        }
    }
    @media (max-width: 720px) {
        .skills{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
        }
    }
</style>
{#if parsedData.basic}
    <div class="flex">
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
        <div class="skills">
            {#each skills as skill,i}
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

    function clickItem(item){
        selectedItem = item;
        skillModal.show();
    }
</script>