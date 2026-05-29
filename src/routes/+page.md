<script lang="ts">
    import HomeLayout from '$lib/components/HomeLayout.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<HomeLayout>

<!--<img src="/gamerbus.png" alt="PsioNick Midbus" class="w-1/3 rounded-[130px] outline-2" />-->

```lua
-- Lua was my first programming language :D (PICO-8 <3)
local function welcome()
    print([[
    
This is the website of Nicolas Banatt, also known as PsioNick on the internet. This site is mainly for documenting my projects, both academic and personal.

My personal interests include programming, game development, speedrunning, anime and manga.

    ]])
end

-- [!code ++]
welcome() -- [!code highlight]
```

</HomeLayout>
