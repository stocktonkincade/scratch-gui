const ScratchBlocks = require('scratch-blocks');

module.exports = function (vm) {
    Object.assign(ScratchBlocks.Categories, {extensions: 'extensions'});

    Object.assign(ScratchBlocks.Colours, {
        extensions: {primary: '#FF6680', secondary: '#FF4D6A', tertiary: '#FF3355'}
    });

    const jsonForMenuBlock = function (name, menuOptionsFn, colors, start) {
        return {
            message0: '%1',
            args0: [
                {
                    type: 'field_dropdown',
                    name: name,
                    options: function () {
                        return start.concat(menuOptionsFn());
                    }
                }
            ],
            inputsInline: true,
            output: 'String',
            colour: colors.secondary,
            colourSecondary: colors.secondary,
            colourTertiary: colors.tertiary,
            outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND
        };
    };

    const voicesMenu = function () {
        const voices = vm.runtime.HACK_SpeechBlocks.getVoices();
        if (voices.length === 0) {
            return [['default', 'default']];
        }
        return voices.map(voice => [voice.name, voice.name]);
    };

    const soundsMenu = function () {
        const sounds = vm.editingTarget ? vm.editingTarget.sprite.sounds : [];
        if (sounds.length === 0) {
            return [['', '']];
        }
        return sounds.map(sound => [sound.name, sound.name]);
    };

    const costumesMenu = function () {
        const costumes = vm.editingTarget ? vm.editingTarget.sprite.costumes : [];
        if (costumes.length === 0) {
            return [['', '']];
        }
        return costumes.map(costume => [costume.name, costume.name]);
    };

    const backdropsMenu = function () {
        const costumes = vm.runtime.targets[0] ? vm.runtime.targets[0].sprite.costumes : [];
        if (costumes.length === 0) {
            return [['', '']];
        }
        return costumes.map(costume => [costume.name, costume.name]);
    };

    const spriteMenu = function () {
        const sprites = [];
        for (const targetId in vm.runtime.targets) {
            if (!vm.runtime.targets.hasOwnProperty(targetId)) continue;
            if (vm.runtime.targets[targetId].isOriginal) {
                if (!vm.runtime.targets[targetId].isStage) {
                    if (vm.runtime.targets[targetId] === vm.editingTarget) {
                        continue;
                    }
                    sprites.push([vm.runtime.targets[targetId].sprite.name, vm.runtime.targets[targetId].sprite.name]);
                }
            }
        }
        return sprites;
    };

    const soundColors = ScratchBlocks.Colours.sounds;

    const looksColors = ScratchBlocks.Colours.looks;

    const motionColors = ScratchBlocks.Colours.motion;

    const sensingColors = ScratchBlocks.Colours.sensing;

    const controlColors = ScratchBlocks.Colours.control;

    const extensionsColors = ScratchBlocks.Colours.extensions;

    ScratchBlocks.Blocks.speech_whenihear = {
      /**
       * Block to start a stack when speech recognition detects a string.
       * @this Blockly.Block
       */
        init: function () {
            this.jsonInit({
                id: 'speech_whenihear',
                message0: 'when I hear %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'STRING'
                    }
                ],
                inputsInline: true,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.speech_speak = {
        /**
        * Block to speak a string with speech synthesis.
        * @this Blockly.Block
        */
        init: function () {
            this.jsonInit({
                message0: 'speak %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'STRING'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.speech_setvoice = {
        /**
        * Block to set a voice for speech synthesis.
        * @this Blockly.Block
        */
        init: function () {
            this.jsonInit({
                message0: 'set voice to %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'VOICE'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.speech_dropdown_voice = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'VOICE',
                        options: [
                          ['default', 'default']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.speech_getlatestspeech = {
        /**
        * Block to to get the most recent speech recognition result.
        * @this Blockly.Block
        */
        init: function () {
            this.jsonInit({
                message0: 'speech',
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND,
                checkboxInFlyout: true,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_dropdown_motor = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'MOTOR_ID',
                        options: [
                          ['motor', 'motor'],
                          ['motor A', 'motor A'],
                          ['motor B', 'motor B'],
                          ['all motors', 'all motors']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_motorOnFor = {
        init: function () {
            this.jsonInit({
                message0: 'turn %1 on for %2 secs',
                args0: [
                    {
                        type: 'input_value',
                        name: 'MOTOR_ID'
                    },
                    {
                        type: 'input_value',
                        name: 'DURATION'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_motorOn = {
        init: function () {
            this.jsonInit({
                message0: 'turn %1 on',
                args0: [
                    {
                        type: 'input_value',
                        name: 'MOTOR_ID'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_motorOff = {
        init: function () {
            this.jsonInit({
                message0: 'turn %1 off',
                args0: [
                    {
                        type: 'input_value',
                        name: 'MOTOR_ID'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_startMotorPower = {
        init: function () {
            this.jsonInit({
                message0: 'set %1 power to %2',
                args0: [
                    {
                        type: 'input_value',
                        name: 'MOTOR_ID'
                    },
                    {
                        type: 'input_value',
                        name: 'POWER'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_dropdown_direction = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIRECTION',
                        options: [
                          ['this way', 'this way'],
                          ['that way', 'that way'],
                          ['reverse', 'reverse']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_setMotorDirection = {
        init: function () {
            this.jsonInit({
                message0: 'set %1 direction to %2',
                args0: [
                    {
                        type: 'input_value',
                        name: 'MOTOR_ID'
                    },
                    {
                        type: 'input_value',
                        name: 'DIRECTION'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_setLightHue = {
        init: function () {
            this.jsonInit({
                message0: 'set light color to %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'HUE'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_playNoteFor = {
        init: function () {
            this.jsonInit({
                message0: 'play note %1 for %2 seconds',
                args0: [
                    {
                        type: 'input_value',
                        name: 'NOTE'
                    },
                    {
                        type: 'input_value',
                        name: 'DURATION'
                    }
                ],
                previousStatement: null,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_dropdown_op = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'OP',
                        options: [
                          ['<', '<'],
                          ['>', '>']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_whenDistance = {
        init: function () {
            this.jsonInit({
                id: 'wedo2_whendistance',
                message0: 'when distance %1 %2',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'OP',
                        options: [
                            ['<', '<'],
                            ['>', '>']
                        ]
                    },
                    {
                        type: 'input_value',
                        name: 'REFERENCE'
                    }
                ],
                inputsInline: true,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_dropdown_tilt = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIRECTION',
                        options: [
                          ['any', 'any'],
                          ['up', 'up'],
                          ['down', 'down'],
                          ['left', 'left'],
                          ['right', 'right']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_dropdown_tilt_reporter = {
        init: function () {
            this.jsonInit({
                message0: '%1',
                args0: [
                    {
                        type: 'field_dropdown',
                        name: 'DIRECTION',
                        options: [
                          ['up', 'up'],
                          ['down', 'down'],
                          ['left', 'left'],
                          ['right', 'right']
                        ]
                    }
                ],
                output: 'String',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_SQUARE,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_whenTilted = {
        init: function () {
            this.jsonInit({
                id: 'wedo2_whentilted',
                message0: 'when tilted %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'DIRECTION'
                    }
                ],
                inputsInline: true,
                nextStatement: null,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_getDistance = {
        init: function () {
            this.jsonInit({
                message0: 'distance',
                output: 'Number',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND,
                checkboxInFlyout: true,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_isTilted = {
        init: function () {
            this.jsonInit({
                message0: 'tilted %1?',
                args0: [
                    {
                        type: 'input_value',
                        name: 'DIRECTION'
                    }
                ],
                output: 'Boolean',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_HEXAGONAL,
                checkboxInFlyout: false,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.wedo2_getTiltAngle = {
        init: function () {
            this.jsonInit({
                message0: 'tilt angle %1',
                args0: [
                    {
                        type: 'input_value',
                        name: 'DIRECTION'
                    }
                ],
                output: 'Number',
                outputShape: ScratchBlocks.OUTPUT_SHAPE_ROUND,
                checkboxInFlyout: true,
                category: ScratchBlocks.Categories.extensions,
                colour: ScratchBlocks.Colours.extensions.primary,
                colourSecondary: ScratchBlocks.Colours.extensions.secondary,
                colourTertiary: ScratchBlocks.Colours.extensions.tertiary
            });
        }
    };

    ScratchBlocks.Blocks.sound_sounds_menu.init = function () {
        const json = jsonForMenuBlock('SOUND_MENU', soundsMenu, soundColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.speech_dropdown_voice.init = function () {
        const json = jsonForMenuBlock('VOICES', voicesMenu, extensionsColors, [
            ['Random', 'Random']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_costume.init = function () {
        const json = jsonForMenuBlock('COSTUME', costumesMenu, looksColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.looks_backdrops.init = function () {
        const json = jsonForMenuBlock('BACKDROP', backdropsMenu, looksColors, []);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_pointtowards_menu.init = function () {
        const json = jsonForMenuBlock('TOWARDS', spriteMenu, motionColors, [
            ['mouse-pointer', '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.motion_goto_menu.init = function () {
        const json = jsonForMenuBlock('TO', spriteMenu, motionColors, [
            ['mouse-pointer', '_mouse_'],
            ['random position', '_random_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_of_object_menu.init = function () {
        const json = jsonForMenuBlock('OBJECT', spriteMenu, sensingColors, [
            ['Stage', '_stage_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_videoonmenutwo.init = function () {
        const json = jsonForMenuBlock('VIDEOONMENU2', spriteMenu, sensingColors, [
            ['stage', 'STAGE']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_distancetomenu.init = function () {
        const json = jsonForMenuBlock('DISTANCETOMENU', spriteMenu, sensingColors, [
            ['mouse-pointer', '_mouse_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.sensing_touchingobjectmenu.init = function () {
        const json = jsonForMenuBlock('TOUCHINGOBJECTMENU', spriteMenu, sensingColors, [
            ['mouse-pointer', '_mouse_'],
            ['edge', '_edge_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.Blocks.control_create_clone_of_menu.init = function () {
        const json = jsonForMenuBlock('CLONE_OPTION', spriteMenu, controlColors, [
            ['myself', '_myself_']
        ]);
        this.jsonInit(json);
    };

    ScratchBlocks.VerticalFlyout.getCheckboxState = function (blockId) {
        const monitoredBlock = vm.runtime.monitorBlocks._blocks[blockId];
        return monitoredBlock ? monitoredBlock.isMonitored : false;
    };

    return ScratchBlocks;
};
