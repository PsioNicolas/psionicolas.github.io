import{O as e,g as t,k as n,m as r,u as i}from"../chunks/lKAUG57D.js";import"../chunks/xihTtKlq.js";import{t as a}from"../chunks/q812xlt6.js";var o=t(`<h1>Gameboy Emulator in C</h1> <h3>Started June 10, 2025</h3> <p>I’ve been meaning to make some sort of emulator for a while, and a Gameboy emulator is just enough of a challenge. I’m writing it in C because I’m familiar with it, but I also need to practice it, as I am constantly being reminded that I will need to be well-versed in C/C++. In the future, I intend to rewrite this project in Rust for practice, and make an Atari 2600 emulator.</p> <br/> Below is the code that I have thus far. <!>`,1);function s(t){a(t,{children:(t,a)=>{var s=o();i(n(e(s),8),()=>`<pre class="shiki github-dark" style="background-color:#24292e;color:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#F97583">#include</span><span style="color:#9ECBFF"> &#x3C;stdio.h></span></span>
<span class="line"><span style="color:#F97583">#include</span><span style="color:#9ECBFF"> &#x3C;stdbool.h></span></span>
<span class="line"><span style="color:#F97583">#include</span><span style="color:#9ECBFF"> &#x3C;stdlib.h></span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> ROM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">7fff</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> VRAM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">9fff</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> SRAM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">bfff</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> WRAM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">dfff</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> OAM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">fe9f</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> IO_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">ff7f</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> HRAM_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">fffe</span></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> IE_END</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">ffff</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#F97583"> unsigned</span><span style="color:#F97583"> char</span><span style="color:#E1E4E8"> u8;</span></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#F97583"> unsigned</span><span style="color:#F97583"> short</span><span style="color:#E1E4E8"> u16;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#E1E4E8"> u8 </span><span style="color:#79B8FF">r8_t</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#F97583"> struct</span><span style="color:#E1E4E8"> &#123;</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 hi;</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 lo;</span></span>
<span class="line"><span style="color:#E1E4E8">&#125; </span><span style="color:#79B8FF">r16_t</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#E1E4E8"> u16 </span><span style="color:#79B8FF">n16_t</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">#define</span><span style="color:#B392F0"> r16_to_u16</span><span style="color:#E1E4E8">(</span><span style="color:#FFAB70">r16</span><span style="color:#E1E4E8">) (</span><span style="color:#79B8FF">0</span><span style="color:#F97583"> |</span><span style="color:#E1E4E8"> (r16.hi </span><span style="color:#F97583">&#x3C;&#x3C;</span><span style="color:#79B8FF"> 8</span><span style="color:#E1E4E8">) </span><span style="color:#F97583">|</span><span style="color:#E1E4E8"> (r16.lo))</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">typedef</span><span style="color:#F97583"> struct</span><span style="color:#E1E4E8"> &#123;</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">rom</span><span style="color:#E1E4E8">[ROM_END </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">vram</span><span style="color:#E1E4E8">[VRAM_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> ROM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">sram</span><span style="color:#E1E4E8">[SRAM_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> VRAM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">wram</span><span style="color:#E1E4E8">[WRAM_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> SRAM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">oam</span><span style="color:#E1E4E8">[OAM_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> WRAM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">io</span><span style="color:#E1E4E8">[IO_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> OAM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">hram</span><span style="color:#E1E4E8">[HRAM_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> IO_END];</span></span>
<span class="line"><span style="color:#E1E4E8">    u8 </span><span style="color:#FFAB70">ie</span><span style="color:#E1E4E8">[IE_END </span><span style="color:#F97583">-</span><span style="color:#E1E4E8"> HRAM_END];</span></span>
<span class="line"><span style="color:#E1E4E8">&#125; Mem;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">// hi: A, lo: F (F is not an r8 register)</span></span>
<span class="line"><span style="color:#79B8FF">r16_t</span><span style="color:#E1E4E8"> AF;</span></span>
<span class="line"><span style="color:#79B8FF">r16_t</span><span style="color:#E1E4E8"> BC;</span></span>
<span class="line"><span style="color:#79B8FF">r16_t</span><span style="color:#E1E4E8"> DE;</span></span>
<span class="line"><span style="color:#79B8FF">r16_t</span><span style="color:#E1E4E8"> HL;</span></span>
<span class="line"><span style="color:#E1E4E8">u16 SP;</span></span>
<span class="line"><span style="color:#E1E4E8">u16 PC </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> 0</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">void</span><span style="color:#B392F0"> load_binary_into_rom</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">const</span><span style="color:#E1E4E8"> u8 </span><span style="color:#F97583">*const</span><span style="color:#FFAB70"> file_name</span><span style="color:#E1E4E8">, Mem </span><span style="color:#F97583">*</span><span style="color:#FFAB70">mem</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#6A737D">    // TODO: Check for fopen error</span></span>
<span class="line"><span style="color:#E1E4E8">    FILE </span><span style="color:#F97583">*</span><span style="color:#E1E4E8">binary </span><span style="color:#F97583">=</span><span style="color:#B392F0"> fopen</span><span style="color:#E1E4E8">(file_name, </span><span style="color:#9ECBFF">"r"</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#B392F0">    fgets</span><span style="color:#E1E4E8">(mem->rom, ROM_END </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">, binary);</span></span>
<span class="line"><span style="color:#B392F0">    fclose</span><span style="color:#E1E4E8">(binary);</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">// Prints ROM</span></span>
<span class="line"><span style="color:#F97583">void</span><span style="color:#B392F0"> dump_rom</span><span style="color:#E1E4E8">(Mem </span><span style="color:#F97583">*</span><span style="color:#FFAB70">mem</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#F97583">    for</span><span style="color:#E1E4E8"> (</span><span style="color:#F97583">int</span><span style="color:#E1E4E8"> i </span><span style="color:#F97583">=</span><span style="color:#79B8FF"> 0</span><span style="color:#E1E4E8">; i </span><span style="color:#F97583">&#x3C;</span><span style="color:#79B8FF"> 256</span><span style="color:#E1E4E8">; i</span><span style="color:#F97583">++</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#B392F0">        printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"</span><span style="color:#79B8FF">%d</span><span style="color:#9ECBFF">: </span><span style="color:#79B8FF">%x&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">, i, mem->rom[i]);</span></span>
<span class="line"><span style="color:#E1E4E8">    &#125;</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">// Prints machine state</span></span>
<span class="line"><span style="color:#F97583">void</span><span style="color:#B392F0"> dump_state</span><span style="color:#E1E4E8">() &#123;</span></span>
<span class="line"><span style="color:#B392F0">    printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"-- PC: 0x</span><span style="color:#79B8FF">%x</span><span style="color:#9ECBFF">, SP: 0x</span><span style="color:#79B8FF">%x</span><span style="color:#9ECBFF">, A: 0x</span><span style="color:#79B8FF">%x</span><span style="color:#9ECBFF">, HL: 0x</span><span style="color:#79B8FF">%x&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">, PC, SP, AF.hi, </span><span style="color:#B392F0">r16_to_u16</span><span style="color:#E1E4E8">(HL));</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">// Reads little endian memory and returns an n16</span></span>
<span class="line"><span style="color:#79B8FF">n16_t</span><span style="color:#B392F0"> n16</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">const</span><span style="color:#E1E4E8"> u8 </span><span style="color:#F97583">*const</span><span style="color:#FFAB70"> n16</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#F97583">    return</span><span style="color:#F97583"> *</span><span style="color:#E1E4E8">(</span><span style="color:#79B8FF">n16_t</span><span style="color:#F97583">*</span><span style="color:#E1E4E8">)n16;</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D">// Returns next PC</span></span>
<span class="line"><span style="color:#F97583">int</span><span style="color:#B392F0"> interpret_ins</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">const</span><span style="color:#E1E4E8"> u8 </span><span style="color:#F97583">*</span><span style="color:#FFAB70">ins_addr</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#F97583">    switch</span><span style="color:#E1E4E8"> (</span><span style="color:#F97583">*</span><span style="color:#E1E4E8">ins_addr) &#123;</span></span>
<span class="line"><span style="color:#F97583">    case</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">31</span><span style="color:#E1E4E8">:</span><span style="color:#6A737D"> // LD SP, n16</span></span>
<span class="line"><span style="color:#E1E4E8">        SP </span><span style="color:#F97583">=</span><span style="color:#B392F0"> n16</span><span style="color:#E1E4E8">(ins_addr </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#B392F0">        printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"0x31: LD SP, $</span><span style="color:#79B8FF">%x&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">, SP);</span></span>
<span class="line"><span style="color:#F97583">        return</span><span style="color:#E1E4E8"> PC </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 3</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    case</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">AF</span><span style="color:#E1E4E8">:</span><span style="color:#6A737D"> // XOR A, A</span></span>
<span class="line"><span style="color:#E1E4E8">        AF.hi </span><span style="color:#F97583">^=</span><span style="color:#E1E4E8"> AF.hi;</span></span>
<span class="line"><span style="color:#B392F0">        printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"0xAF: XOR A, A</span><span style="color:#79B8FF">&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">        return</span><span style="color:#E1E4E8"> PC </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    case</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">21</span><span style="color:#E1E4E8">:</span><span style="color:#6A737D"> // LD HL, n16</span></span>
<span class="line"><span style="color:#79B8FF">        n16_t</span><span style="color:#E1E4E8"> x </span><span style="color:#F97583">=</span><span style="color:#B392F0"> n16</span><span style="color:#E1E4E8">(ins_addr </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">        HL.hi </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> x </span><span style="color:#F97583">>></span><span style="color:#79B8FF"> 8</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">        HL.lo </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> x;</span></span>
<span class="line"><span style="color:#B392F0">        printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"0x21: LD HL, $</span><span style="color:#79B8FF">%x&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">, x);</span></span>
<span class="line"><span style="color:#F97583">        return</span><span style="color:#E1E4E8"> PC </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 3</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    </span></span>
<span class="line"><span style="color:#F97583">    case</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">32</span><span style="color:#E1E4E8">:</span><span style="color:#6A737D"> // LD [HL-], A</span></span>
<span class="line"><span style="color:#E1E4E8">        HL.lo </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> AF.hi;</span></span>
<span class="line"><span style="color:#B392F0">        printf</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"0x32: LD [HL-], A</span><span style="color:#79B8FF">&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">        return</span><span style="color:#E1E4E8"> PC </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E1E4E8">    </span></span>
<span class="line"><span style="color:#F97583">    case</span><span style="color:#F97583"> 0x</span><span style="color:#79B8FF">CB</span><span style="color:#E1E4E8">:</span><span style="color:#6A737D"> // PREFIX</span></span>
<span class="line"><span style="color:#E1E4E8">        PC </span><span style="color:#F97583">=</span><span style="color:#B392F0"> interpret_prefixed_ins</span><span style="color:#E1E4E8">(ins_addr </span><span style="color:#F97583">+</span><span style="color:#79B8FF"> 1</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#F97583">        return</span><span style="color:#E1E4E8"> PC;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">    default</span><span style="color:#E1E4E8">:</span></span>
<span class="line"><span style="color:#B392F0">        fprintf</span><span style="color:#E1E4E8">(stderr, </span><span style="color:#9ECBFF">"Unknown instruction: 0x</span><span style="color:#79B8FF">%x&#92;n</span><span style="color:#9ECBFF">"</span><span style="color:#E1E4E8">, </span><span style="color:#F97583">*</span><span style="color:#FFAB70">ins_addr</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#B392F0">        exit</span><span style="color:#E1E4E8">(</span><span style="color:#79B8FF">1</span><span style="color:#E1E4E8">);</span></span>
<span class="line"><span style="color:#E1E4E8">    &#125;</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">void</span><span style="color:#B392F0"> run_rom</span><span style="color:#E1E4E8">(Mem </span><span style="color:#F97583">*</span><span style="color:#FFAB70">mem</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#F97583">    while</span><span style="color:#E1E4E8"> (</span><span style="color:#79B8FF">true</span><span style="color:#E1E4E8">) &#123;</span></span>
<span class="line"><span style="color:#E1E4E8">        PC </span><span style="color:#F97583">=</span><span style="color:#B392F0"> interpret_ins</span><span style="color:#E1E4E8">(mem->rom </span><span style="color:#F97583">+</span><span style="color:#E1E4E8"> PC);</span></span>
<span class="line"><span style="color:#B392F0">        dump_state</span><span style="color:#E1E4E8">();</span></span>
<span class="line"><span style="color:#E1E4E8">    &#125;</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583">int</span><span style="color:#B392F0"> main</span><span style="color:#E1E4E8">() &#123;</span></span>
<span class="line"><span style="color:#E1E4E8">    Mem mem </span><span style="color:#F97583">=</span><span style="color:#E1E4E8"> &#123;</span><span style="color:#79B8FF">0</span><span style="color:#E1E4E8">&#125;;</span></span>
<span class="line"><span style="color:#B392F0">    load_binary_into_rom</span><span style="color:#E1E4E8">(</span><span style="color:#9ECBFF">"dmg_boot.bin"</span><span style="color:#E1E4E8">, </span><span style="color:#F97583">&#x26;</span><span style="color:#E1E4E8">mem);</span></span>
<span class="line"><span style="color:#B392F0">    run_rom</span><span style="color:#E1E4E8">(</span><span style="color:#F97583">&#x26;</span><span style="color:#E1E4E8">mem);</span></span>
<span class="line"><span style="color:#E1E4E8">&#125;</span></span></code></pre>`),r(t,s)},$$slots:{default:!0}})}export{s as component};