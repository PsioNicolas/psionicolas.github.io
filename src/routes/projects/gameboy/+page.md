<script lang="ts">
    import BlogLayout from '$lib/components/BlogLayout.svelte';
</script>

<BlogLayout>

# Gameboy Emulator in C
### Started June 10, 2025

I've been meaning to make some sort of emulator for a while, and a Gameboy emulator is just enough of a challenge. I'm writing it in C because I'm familiar with it, but I also need to practice it, as I am constantly being reminded that I will need to be well-versed in C/C++. In the future, I intend to rewrite this project in Rust for practice, and make an Atari 2600 emulator.

Below is the code that I have thus far.

```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define ROM_END 0x7fff
#define VRAM_END 0x9fff
#define SRAM_END 0xbfff
#define WRAM_END 0xdfff
#define OAM_END 0xfe9f
#define IO_END 0xff7f
#define HRAM_END 0xfffe
#define IE_END 0xffff

typedef unsigned char u8;
typedef unsigned short u16;

typedef u8 r8_t;
typedef struct {
    u8 hi;
    u8 lo;
} r16_t;

typedef u16 n16_t;

#define r16_to_u16(r16) (0 | (r16.hi << 8) | (r16.lo))

typedef struct {
    u8 rom[ROM_END + 1];
    u8 vram[VRAM_END - ROM_END];
    u8 sram[SRAM_END - VRAM_END];
    u8 wram[WRAM_END - SRAM_END];
    u8 oam[OAM_END - WRAM_END];
    u8 io[IO_END - OAM_END];
    u8 hram[HRAM_END - IO_END];
    u8 ie[IE_END - HRAM_END];
} Mem;

// hi: A, lo: F (F is not an r8 register)
r16_t AF;
r16_t BC;
r16_t DE;
r16_t HL;
u16 SP;
u16 PC = 0;

void load_binary_into_rom(const u8 *const file_name, Mem *mem) {
    // TODO: Check for fopen error
    FILE *binary = fopen(file_name, "r");
    fgets(mem->rom, ROM_END + 1, binary);
    fclose(binary);
}

// Prints ROM
void dump_rom(Mem *mem) {
    for (int i = 0; i < 256; i++) {
        printf("%d: %x\n", i, mem->rom[i]);
    }
}

// Prints machine state
void dump_state() {
    printf("-- PC: 0x%x, SP: 0x%x, A: 0x%x, HL: 0x%x\n", PC, SP, AF.hi, r16_to_u16(HL));
}

// Reads little endian memory and returns an n16
n16_t n16(const u8 *const n16) {
    return *(n16_t*)n16;
}

// Returns next PC
int interpret_ins(const u8 *ins_addr) {
    switch (*ins_addr) {
    case 0x31: // LD SP, n16
        SP = n16(ins_addr + 1);
        printf("0x31: LD SP, $%x\n", SP);
        return PC + 3;

    case 0xAF: // XOR A, A
        AF.hi ^= AF.hi;
        printf("0xAF: XOR A, A\n");
        return PC + 1;

    case 0x21: // LD HL, n16
        n16_t x = n16(ins_addr + 1);
        HL.hi = x >> 8;
        HL.lo = x;
        printf("0x21: LD HL, $%x\n", x);
        return PC + 3;
    
    case 0x32: // LD [HL-], A
        HL.lo = AF.hi;
        printf("0x32: LD [HL-], A\n");
        return PC + 1;
    
    case 0xCB: // PREFIX
        PC = interpret_prefixed_ins(ins_addr + 1);
        return PC;

    default:
        fprintf(stderr, "Unknown instruction: 0x%x\n", *ins_addr);
        exit(1);
    }
}

void run_rom(Mem *mem) {
    while (true) {
        PC = interpret_ins(mem->rom + PC);
        dump_state();
    }
}

int main() {
    Mem mem = {0};
    load_binary_into_rom("dmg_boot.bin", &mem);
    run_rom(&mem);
}
```

</BlogLayout>
