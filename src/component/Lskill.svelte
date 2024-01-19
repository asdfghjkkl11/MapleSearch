<style>
    .skills{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
    .summary.skills{
        min-width: 720px;
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
    .preset-list{
        display: flex;
        align-items: center;
        gap: 4px;
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
            <div class="preset-list">
                <button class="preset-btn" class:active={skillPreset===1} on:click={()=>{skillPreset=1; changePreset()}}>1</button>
                <button class="preset-btn" class:active={skillPreset===2} on:click={()=>{skillPreset=2; changePreset()}}>2</button>
                <button class="preset-btn" class:active={skillPreset===3} on:click={()=>{skillPreset=3; changePreset()}}>3</button>
            </div>
            <button class="btn" on:click={changeDisplayMode}>
                {#if itemOrderMode === 1}
                    <ItemType1/>
                {:else}
                    <ItemType2/>
                {/if}
            </button>
        </div>
        <div class="skills" class:summary={itemOrderMode===0}>
            {#if itemOrderMode===0}
                <div class="skill" on:click={()=>clickItem(ownSkill)}>
                    <span class="skill-text">
                        <div>
                            <img src="{ownSkill.skill_icon}">
                        </div>
                        <span>
                            <span class="green">{ownSkill.skill_level}</span>
                        </span>
                    </span>
                </div>
                {#each skills as skill,i}
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
                {/each}
            {:else}
                <div class="skill" on:click={()=>clickItem(ownSkill)}>
                    <span class="highlight skill-text">
                        <div>
                            <img src="{ownSkill.skill_icon}">
                        </div>
                        <span>{ownSkill.skill_name}</span>
                        <span>
                            <span class="green">{ownSkill.skill_level}</span>
                        </span>
                    </span>
                </div>
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
            {/if}
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
    let ownSkill = nvl(parsedData['link-skill'].character_owned_link_skill, {});
    let skills = nvl(parsedData['link-skill'].character_link_skill,[]);
    let selectedItem = {
        "skill_name": "",
        "skill_description": "",
        "skill_level": 0,
        "skill_effect": "",
        "skill_icon": ""
    };

    let itemOrderMode = 0;
    let skillPreset = null;

    function clickItem(item){
        selectedItem = item;
        skillModal.show();
    }
    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }

    function changePreset() {
        skillPreset
        ownSkill = nvl(parsedData['link-skill'][`character_owned_link_skill_preset_${skillPreset}`],parsedData['link-skill'].character_owned_link_skill);
        skills = nvl(parsedData['link-skill'][`character_link_skill_preset_${skillPreset}`],parsedData['link-skill'].character_link_skill);

    }
</script>