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
    <div class="skills">
        {#each skills as skill,i}
            <div class="skill">
                <span class="highlight skill-text">
                    <span>{skill.v_core_name}: </span>
                    <span>
                        <span class="green">{skill.v_core_level + skill.slot_level}</span>
                        (<span class="yellow">{skill.v_core_level}</span> + <span class="yellow">{skill.slot_level}</span>)
                    </span>
                </span>
                {#if skill.v_core_type === "강화코어"}
                    <span>{skill.v_core_skill_1}</span>
                    <span>{skill.v_core_skill_2}</span>
                    <span>{skill.v_core_skill_3}</span>
                {/if}
            </div>
        {/each}
    </div>
{/if}
<script>
    import {nvl} from "../js/common";

    export let parsedData;

    let skills = nvl(parsedData.vmatrix.character_v_core_equipment,[]);
</script>