import { EffectInstance } from '../store/editorStore';

export type Effect = {
  name: string;
  uniforms: Record<string, number>;
};

export class EffectEngine {
  effects: Effect[] = [];

  add(effect: Effect) {
    this.effects.push(effect);
  }

  applyEffect(effectName: string, uniforms: Record<string, number>) {
    return {
      name: effectName,
      uniforms
    };
  }

  applyEffects(pixels: ImageData, effects: EffectInstance[]): ImageData {
    let result = pixels;
    
    for (const effect of effects) {
      if (effect.name === 'blur') {
        result = this.applyBlur(result, effect.params.radius || 5);
      } else if (effect.name === 'color') {
        result = this.applyColor(result, effect.params);
      }
    }
    
    return result;
  }

  private applyBlur(pixels: ImageData, radius: number): ImageData {
    // Simple box blur implementation
    const { width, height, data } = pixels;
    const output = new ImageData(width, height);
    const r = Math.floor(radius);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r_sum = 0, g_sum = 0, b_sum = 0, a_sum = 0, count = 0;
        
        for (let ky = -r; ky <= r; ky++) {
          for (let kx = -r; kx <= r; kx++) {
            const px = x + kx;
            const py = y + ky;
            
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              r_sum += data[idx];
              g_sum += data[idx + 1];
              b_sum += data[idx + 2];
              a_sum += data[idx + 3];
              count++;
            }
          }
        }
        
        const idx = (y * width + x) * 4;
        output.data[idx] = r_sum / count;
        output.data[idx + 1] = g_sum / count;
        output.data[idx + 2] = b_sum / count;
        output.data[idx + 3] = a_sum / count;
      }
    }
    
    return output;
  }

  private applyColor(pixels: ImageData, params: Record<string, number>): ImageData {
    const { width, height, data } = pixels;
    const output = new ImageData(width, height);
    
    const brightness = params.brightness || 1;
    const contrast = params.contrast || 1;
    const saturation = params.saturation || 1;
    
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      
      // Apply brightness
      r *= brightness;
      g *= brightness;
      b *= brightness;
      
      // Apply contrast
      r = ((r / 255 - 0.5) * contrast + 0.5) * 255;
      g = ((g / 255 - 0.5) * contrast + 0.5) * 255;
      b = ((b / 255 - 0.5) * contrast + 0.5) * 255;
      
      // Clamp values
      output.data[i] = Math.max(0, Math.min(255, r));
      output.data[i + 1] = Math.max(0, Math.min(255, g));
      output.data[i + 2] = Math.max(0, Math.min(255, b));
      output.data[i + 3] = data[i + 3];
    }
    
    return output;
  }
}
