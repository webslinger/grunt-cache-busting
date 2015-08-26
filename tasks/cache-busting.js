module.exports = function (grunt) {
    var fs     = require('fs'),
        path   = require('path'),
        crypto = require('crypto'),
        glob = require('glob'),
        gruntTextReplace = require('grunt-text-replace/lib/grunt-text-replace')

    grunt.registerMultiTask('cache-busting', 'Cache bust file and update references', function() {
        var fileContents = grunt.file.read(this.data.file),
            hash = crypto.createHash('md5').update(fileContents).digest("hex"),
            outputDir = path.dirname(this.data.file),
            fileExtension = path.extname(this.data.file),
            replacementExtension = path.extname(this.data.replacement),
            replacementWithoutExtension = this.data.replacement.slice(0, this.data.replacement.length - replacementExtension.length),
            outputFile = outputDir + path.sep + replacementWithoutExtension + "-" + hash + fileExtension,
            options = this.options({
                global: 'true'
            }),
            regex, regexParam;

        if (this.data.get_param){
            if (options.global) {
                regexParam = new RegExp(this.data.replacement + "(\\?v=)?([a-z0-9]+)*", 'g');
            } else {
                regexParam = new RegExp(this.data.replacement + "(\\?v=)?([a-z0-9]+)*");
            }
            gruntTextReplace.replace({
                src: this.data.replace,
                overwrite: true,
                replacements: [{
                    from: regexParam,
                    to: this.data.replacement + "?v=" + hash
                }]
            });

        } else {
            if (this.data.cleanup) {
                var files = glob.sync(outputDir + path.sep + replacementWithoutExtension + "-*" + fileExtension);
                files.forEach(function(file){
                    fs.unlink(file);
                })
            }
            fs.rename(this.data.file, outputFile);
            if (options.global) {
                regex = new RegExp(replacementWithoutExtension + "((\-?)(.+)*)" + replacementExtension, 'g');
            } else {
                regex = new RegExp(replacementWithoutExtension + "((\-?)(.+)*)" + replacementExtension);
            }
            gruntTextReplace.replace({
                src: this.data.replace,
                overwrite: true,
                replacements: [{
                    from: regex,
                    to: replacementWithoutExtension + "-" + hash + replacementExtension
                }]
            });

        }
    });
};
