import React from 'react';

interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
}

const Slider: React.FC<SliderProps> = ({ min, max, value, onChange, className }) => {
    return (
        <div className={`w-full ${className}`}>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="custom-slider w-full appearance-none focus:outline-none"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

export default Slider; 