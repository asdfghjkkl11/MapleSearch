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
    .skill .highlight{
        min-width: 160px;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
                <div class="skill">
                    <span class="highlight">
                        <span>{skill.hexa_core_name}: </span><span class="green">{skill.hexa_core_level}</span>
                    </span>
                </div>
            {/each}
        </div>
    </div>
{/if}
<script>
    import {nvl} from "../js/common";

    export let parsedData;

    let skills = nvl(parsedData.hexamatrix.character_hexa_core_equipment,[]);
    let stats = nvl(parsedData["hexamatrix-stat"].character_hexa_stat_core,[]);
</script>